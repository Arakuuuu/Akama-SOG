export type OS = 'linux' | 'windows' | 'mac';

export type SecurityCategory = 
  | 'network'
  | 'wireless'
  | 'web'
  | 'forensics'
  | 'password'
  | 'vulnerability'
  | 'log'
  | 'threat'
  | 'privilege'
  | 'incident'
  | 'social'
  | 'container'
  | 'mobile'
  | 'encryption'
  | 'malware'
  | 'monitoring'
  | 'osint'
  | 'crypto';

export interface Operation {
  id: string;
  title: string;
  description: string;
  category: SecurityCategory;
  tool: string;
  installation: Record<OS, string>;
  usage: string[];
  examples: string[];
}

export const OPERATIONS: Operation[] = [
  {
    id: 'network-scanning',
    title: 'Network Scanning',
    description: 'Scan networks for active hosts, open ports, and vulnerabilities',
    category: 'network',
    tool: 'Nmap',
    installation: {
      linux: 'sudo apt update && sudo apt install nmap',
      windows: 'winget install nmap',
      mac: 'brew install nmap'
    },
    usage: [
      'Basic port scan',
      'Service version detection',
      'OS detection',
      'Script scanning'
    ],
    examples: [
      'nmap -sS <target-ip>',
      'nmap -sV <target-ip>',
      'nmap -O <target-ip>',
      'nmap --script vuln <target-ip>'
    ]
  },
  {
    id: 'vulnerability-assessment',
    title: 'Vulnerability Assessment',
    description: 'Perform in-depth vulnerability assessments for networks and systems',
    category: 'vulnerability',
    tool: 'OpenVAS',
    installation: {
      linux: 'sudo apt update && sudo apt install openvas && sudo gvm-setup',
      windows: 'Download from Greenbone.net',
      mac: 'Use virtual machine with Linux'
    },
    usage: [
      'Start OpenVAS service',
      'Access web interface',
      'Configure scan targets',
      'Run vulnerability scan'
    ],
    examples: [
      'sudo gvm-start',
      'Access https://<your-ip>:9392',
      'Create new task',
      'Start scan'
    ]
  },
  {
    id: 'log-analysis',
    title: 'Log Analysis',
    description: 'Analyze system logs to detect anomalies or suspicious activity',
    category: 'log',
    tool: 'Logwatch',
    installation: {
      linux: 'sudo apt install logwatch',
      windows: 'Use Windows Event Viewer or Splunk',
      mac: 'Use syslog-ng'
    },
    usage: [
      'Generate daily report',
      'Configure log sources',
      'Set detail level',
      'Specify time range'
    ],
    examples: [
      'sudo logwatch --detail High --mailto admin@example.com --range today',
      'sudo logwatch --service sshd --detail Med',
      'sudo logwatch --range "between -7 days and -1 days"',
      'sudo logwatch --service all --detail Low'
    ]
  },
  {
    id: 'forensic-analysis',
    title: 'Forensic Analysis',
    description: 'Analyze digital forensic evidence such as disks and files',
    category: 'forensics',
    tool: 'Autopsy',
    installation: {
      linux: 'sudo apt install autopsy',
      windows: 'Download from sleuthkit.org/autopsy',
      mac: 'Download from sleuthkit.org/autopsy'
    },
    usage: [
      'Create new case',
      'Add data source',
      'Run ingest modules',
      'Analyze results'
    ],
    examples: [
      'autopsy',
      'Access http://localhost:9999/autopsy',
      'Add disk image',
      'Generate report'
    ]
  },
  {
    id: 'password-cracking',
    title: 'Password Cracking',
    description: 'Crack passwords by testing against hash files',
    category: 'password',
    tool: 'John the Ripper',
    installation: {
      linux: 'sudo apt install john',
      windows: 'Download from openwall.com/john',
      mac: 'brew install john'
    },
    usage: [
      'Basic password cracking',
      'Use wordlist attack',
      'Show cracked passwords',
      'List supported formats'
    ],
    examples: [
      'john hash.txt',
      'john --wordlist=wordlist.txt hash.txt',
      'john --show hash.txt',
      'john --list=formats'
    ]
  },
  {
    id: 'web-security',
    title: 'Web Application Security Testing',
    description: 'Identify vulnerabilities in web applications',
    category: 'web',
    tool: 'OWASP ZAP',
    installation: {
      linux: 'sudo apt install zaproxy',
      windows: 'Download from zaproxy.org',
      mac: 'brew install zaproxy'
    },
    usage: [
      'Start proxy',
      'Spider target',
      'Active scan',
      'Generate report'
    ],
    examples: [
      'zaproxy',
      'Configure browser proxy',
      'Run automated scan',
      'Export HTML report'
    ]
  },
  {
    id: 'threat-intelligence',
    title: 'Threat Intelligence Gathering',
    description: 'Map relationships between domains, IPs, and entities',
    category: 'threat',
    tool: 'Maltego',
    installation: {
      linux: 'sudo dpkg -i maltego.deb',
      windows: 'Download from maltego.com',
      mac: 'Download from maltego.com'
    },
    usage: [
      'Create new graph',
      'Add entities',
      'Run transforms',
      'Analyze relationships'
    ],
    examples: [
      'Launch Maltego',
      'Add domain entity',
      'Run DNS transform',
      'Export graph'
    ]
  },
  {
    id: 'privilege-escalation',
    title: 'Privilege Escalation Enumeration',
    description: 'Discover potential privilege escalation vectors',
    category: 'privilege',
    tool: 'LinPEAS',
    installation: {
      linux: 'git clone https://github.com/carlospolop/PEASS-ng.git',
      windows: 'Download from github.com/carlospolop/PEASS-ng',
      mac: 'git clone https://github.com/carlospolop/PEASS-ng.git'
    },
    usage: [
      'Download script',
      'Set permissions',
      'Run enumeration',
      'Analyze results'
    ],
    examples: [
      'chmod +x linpeas.sh',
      './linpeas.sh',
      './linpeas.sh -a > output.txt',
      'grep "99%" output.txt'
    ]
  },
  {
    id: 'network-monitoring',
    title: 'Network Traffic Analysis',
    description: 'Monitor and analyze network traffic in real-time',
    category: 'monitoring',
    tool: 'Wireshark',
    installation: {
      linux: 'sudo apt install wireshark',
      mac: 'brew install wireshark',
      windows: 'winget install WiresharkFoundation.Wireshark'
    },
    usage: [
      'Capture network traffic',
      'Apply display filters',
      'Analyze protocols',
      'Export packet data'
    ],
    examples: [
      'wireshark -i eth0',
      'tcp.port == 443',
      'http.request.method == "POST"',
      'wireshark -r capture.pcap'
    ]
  },
  {
    id: 'malware-analysis',
    title: 'Malware Analysis',
    description: 'Analyze suspicious files and detect malware',
    category: 'malware',
    tool: 'Cuckoo Sandbox',
    installation: {
      linux: 'git clone https://github.com/cuckoosandbox/cuckoo.git && cd cuckoo && python setup.py install',
      mac: 'Use Docker: docker pull cuckoosandbox/cuckoo',
      windows: 'Use WSL or Docker for installation'
    },
    usage: [
      'Submit samples',
      'View analysis reports',
      'Network behavior analysis',
      'Memory analysis'
    ],
    examples: [
      'cuckoo submit file.exe',
      'cuckoo web --host 127.0.0.1 --port 8080',
      'cuckoo api --host 127.0.0.1 --port 8090',
      'cuckoo clean'
    ]
  },
  {
    id: 'wireless-security',
    title: 'Wireless Network Security',
    description: 'Test wireless network security and detect vulnerabilities',
    category: 'wireless',
    tool: 'Aircrack-ng Suite',
    installation: {
      linux: 'sudo apt install aircrack-ng',
      mac: 'brew install aircrack-ng',
      windows: 'Download from aircrack-ng.org'
    },
    usage: [
      'Monitor wireless traffic',
      'Capture handshakes',
      'Crack WEP/WPA keys',
      'Detect rogue access points'
    ],
    examples: [
      'airmon-ng start wlan0',
      'airodump-ng wlan0mon',
      'aireplay-ng -0 1 -a [BSSID] -c [CLIENT] wlan0mon',
      'aircrack-ng -w wordlist.txt capture.cap'
    ]
  },
  {
    id: 'osint-gathering',
    title: 'OSINT Information Gathering',
    description: 'Collect and analyze publicly available information',
    category: 'osint',
    tool: 'TheHarvester',
    installation: {
      linux: 'sudo apt install theharvester',
      mac: 'pip3 install theharvester',
      windows: 'pip3 install theharvester'
    },
    usage: [
      'Email harvesting',
      'Domain enumeration',
      'Employee name gathering',
      'Subdomain discovery'
    ],
    examples: [
      'theharvester -d company.com -b all',
      'theharvester -d company.com -b google',
      'theharvester -d company.com -b linkedin',
      'theharvester -d company.com -b shodan'
    ]
  },
  {
    id: 'crypto-analysis',
    title: 'Cryptographic Analysis',
    description: 'Analyze and test cryptographic implementations',
    category: 'crypto',
    tool: 'CrypTool',
    installation: {
      linux: 'Download from cryptool.org',
      mac: 'Download from cryptool.org',
      windows: 'Download from cryptool.org'
    },
    usage: [
      'Analyze encryption methods',
      'Test crypto implementations',
      'Visualize algorithms',
      'Educational demonstrations'
    ],
    examples: [
      'Launch CrypTool GUI',
      'Load sample files',
      'Apply crypto analysis',
      'View algorithm visualization'
    ]
  }
];