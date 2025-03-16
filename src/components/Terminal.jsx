import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const term = useRef(null);
  const fitAddon = useRef(null);
  let command = "";
  const [installedPackages, setInstalledPackages] = useState([]);

  useEffect(() => {
    if (!terminalRef.current) return;

    term.current = new Terminal({
      rows: 12,
      theme: { background: "#1E1E1E", foreground: "#FFFFFF" },
      cursorBlink: true,
    });

    fitAddon.current = new FitAddon();
    term.current.loadAddon(fitAddon.current);
    term.current.open(terminalRef.current);
    setTimeout(() => fitAddon.current.fit(), 50);

    term.current.writeln("Welcome to the Live Code Editor Terminal!");
    term.current.write("> ");
    term.current.focus();

    term.current.onData(async (data) => {
      const code = data.charCodeAt(0);

      if (code === 13) {
        // ENTER key -> Execute command
        term.current.writeln(""); 
        executeCommand(command);
        command = "";
        term.current.write("> ");
      } else if (code === 127) {
        // BACKSPACE key
        if (command.length > 0) {
          command = command.slice(0, -1);
          term.current.write("\b \b");
        }
      } else {
        command += data;
        term.current.write(data);
      }
    });

    return () => term.current.dispose();
  }, []);

  const executeCommand = async (cmd) => {
    if (!cmd.trim()) return;
    term.current.writeln(`Executing: ${cmd}...`);
  
    try {
      const response = await fetch("http://localhost:5000/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: cmd }),
      });
      const result = await response.json();
      term.current.writeln(result.output || "Command executed.");
  
      // ✅ If npm install, add package dynamically
      if (cmd.startsWith("npm install ")) {
        const packageName = cmd.split(" ")[2];
        if (!installedPackages.includes(packageName)) {
          setInstalledPackages((prev) => [...prev, packageName]);
        }
      }
  
      // ✅ If npm uninstall, remove package dynamically
      if (cmd.startsWith("npm uninstall ")) {
        const packageName = cmd.split(" ")[2];
        setInstalledPackages((prev) =>
          prev.filter((pkg) => pkg !== packageName)
        );
      }
    } catch (error) {
      term.current.writeln("Error executing command.");
    }
  };  

  return (
    <div>
      <div ref={terminalRef} style={{ height: "250px", width: "100%", border: "1px solid #ccc" }} />
      <div>
        <h3>Installed Packages:</h3>
        <ul>
          {installedPackages.map((pkg, index) => (
            <li key={index}>{pkg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TerminalComponent;
