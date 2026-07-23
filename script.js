/* =========================================================
   TechFix — Computer Troubleshooting Simulation Game
   Vanilla JS, single file, playable, offline (no backend).
   ========================================================= */

const TOOL_ICONS = { "Screwdriver":"🪛","Flashlight":"🔦","Multimeter":"🧪","PSU Tester":"🔋","RAM Module":"🟩",
  "GPU Tester":"🖼️","HDMI Cable":"📺","Cable Tester":"🔌","Network Diagnostic Tool":"🌐","Compressed Air":"💨",
  "Thermal Paste":"🧴","USB Tester":"🔍","Replacement Cable":"🔗","Audio Tester":"🎧","Replacement Battery":"🔘",
  "Task Manager":"📊","Disk Cleanup":"🧹","Antivirus Tool":"🛡️","Driver Update Tool":"⬇️","RAM Tester":"🧠",
  "Diagnostic Tool":"🩺" };

const MISSIONS = [
  { title:"Computer Won't Turn On", icon:"💻", badge:"Hardware Rookie", badgeIcon:"🛠️", difficulty:"Easy", est:"10 Minutes",
    scenario:"A customer brings in a desktop computer that does not power on when the power button is pressed. Your task is to inspect the system, identify the possible cause, and apply the correct troubleshooting steps to restore the computer.",
    objectives:["Identify possible causes of power failure","Perform basic hardware inspection","Apply the correct troubleshooting process","Select the appropriate solution"],
    equipment:["Screwdriver","Flashlight","Multimeter","PSU Tester","RAM Module"],
    components:[
      {id:"powerCable", name:"Power Cable", icon:"🔌", ok:true, finding:"Securely connected to both the wall outlet and the PC."},
      {id:"powerSupply", name:"Power Supply", icon:"🔋", ok:false, finding:"Fails to output voltage when tested with the PSU Tester."},
      {id:"motherboard", name:"Motherboard", icon:"🖥️", ok:true, finding:"No visible damage or burnt components."},
      {id:"ram", name:"RAM", icon:"🟩", ok:true, finding:"Properly seated in its slot."},
      {id:"cpu", name:"CPU", icon:"🧩", ok:true, finding:"Seated correctly, no bent pins."},
      {id:"storage", name:"Storage Drive", icon:"💾", ok:true, finding:"Detected and spinning normally."}
    ],
    causes:[
      {id:"psu", label:"Faulty Power Supply (PSU)", icon:"🔋", desc:"The system does not receive adequate power.", correct:true},
      {id:"ram", label:"Loose RAM Module", icon:"🟩", desc:"Memory modules may not be properly seated.", correct:false},
      {id:"mobo", label:"Damaged Motherboard", icon:"🖥️", desc:"The motherboard may be damaged.", correct:false},
      {id:"cable", label:"Defective Power Cable", icon:"🔌", desc:"The power cable may be defective.", correct:false}
    ],
    feedback:{ why:"The power cable was securely connected, and the RAM was properly installed. During testing, the Power Supply Unit failed to deliver power to the motherboard, preventing the computer from turning on. Therefore, replacing the PSU is the correct solution.",
      tips:["Always inspect the power source before replacing components.","Verify cable connections before diagnosing hardware failure.","Follow a step-by-step troubleshooting process.","Test components before concluding they are defective."] } },

  { title:"Monitor Shows No Video Output", icon:"🖤", badge:"Display Detective", badgeIcon:"🔍", difficulty:"Easy", est:"9 Minutes",
    scenario:"A desktop PC powers on — fans spin and lights are on — but the monitor stays black. The customer says this happened suddenly after moving the unit.",
    objectives:["Distinguish power issues from display issues","Inspect expansion card seating","Check monitor and cable status","Select the appropriate solution"],
    equipment:["Screwdriver","Flashlight","Multimeter","GPU Tester","HDMI Cable"],
    components:[
      {id:"monitorCable", name:"Monitor Cable", icon:"📺", ok:true, finding:"Firmly connected on both ends."},
      {id:"gpu", name:"Graphics Card", icon:"🖼️", ok:false, finding:"Not fully seated in the PCIe slot — sits slightly raised."},
      {id:"ram", name:"RAM", icon:"🟩", ok:true, finding:"Properly seated, no beep codes on boot."},
      {id:"motherboard", name:"Motherboard", icon:"🖥️", ok:true, finding:"No visible damage."},
      {id:"monitorPower", name:"Monitor Power", icon:"🔆", ok:true, finding:"Monitor is powered on and in standby-ready state."},
      {id:"displaySettings", name:"Display Settings", icon:"⚙️", ok:true, finding:"Input source is set correctly."}
    ],
    causes:[
      {id:"gpu", label:"GPU Not Properly Seated", icon:"🖼️", desc:"The graphics card may have shifted loose in its slot.", correct:true},
      {id:"monoff", label:"Monitor is Powered Off", icon:"🔆", desc:"The display device itself may be off.", correct:false},
      {id:"input", label:"Wrong Display Input Selected", icon:"⚙️", desc:"The monitor may be reading the wrong source.", correct:false},
      {id:"ram", label:"Faulty RAM Module", icon:"🟩", desc:"Memory issues could prevent boot.", correct:false}
    ],
    feedback:{ why:"The monitor cable, power, and settings were all fine, and RAM showed no beep codes. Physical inspection revealed the graphics card had shifted loose after the unit was moved, breaking the video signal. Reseating it restores output.",
      tips:["Moving a PC can loosen expansion cards — always recheck after transport.","Rule out cabling and monitor settings before opening the case.","A card that 'looks' seated can still be making poor contact.","Beep codes (or their absence) are a fast way to rule RAM in or out."] } },

  { title:"No Internet Connection", icon:"📡", badge:"Network Ninja", badgeIcon:"🌐", difficulty:"Easy", est:"8 Minutes",
    scenario:"A user reports their browser shows 'No Internet Access.' Other devices on the same network connect just fine.",
    objectives:["Isolate device-level vs network-level issues","Inspect physical network connections","Check adapter and router status","Select the appropriate solution"],
    equipment:["Cable Tester","Flashlight","Multimeter","Network Diagnostic Tool","Screwdriver"],
    components:[
      {id:"ethernet", name:"Ethernet Cable", icon:"🔌", ok:false, finding:"Unplugged from the PC's LAN port."},
      {id:"wifiAdapter", name:"Wi-Fi Adapter", icon:"📶", ok:true, finding:"Enabled and detected in device settings."},
      {id:"router", name:"Router", icon:"📡", ok:true, finding:"Powered on, other devices connect normally."},
      {id:"networkSettings", name:"Network Settings", icon:"⚙️", ok:true, finding:"IP configuration looks correct."},
      {id:"modem", name:"Modem", icon:"🔲", ok:true, finding:"Online, signal lights normal."},
      {id:"firewall", name:"Firewall", icon:"🛡️", ok:true, finding:"Not blocking the connection."}
    ],
    causes:[
      {id:"cable", label:"Disconnected Ethernet Cable", icon:"🔌", desc:"The physical cable may not be plugged in.", correct:true},
      {id:"router", label:"Router is Powered Off", icon:"📡", desc:"The router may not be running.", correct:false},
      {id:"settings", label:"Wrong Network Settings", icon:"⚙️", desc:"IP configuration may be incorrect.", correct:false},
      {id:"firewall", label:"Firewall Blocking Connection", icon:"🛡️", desc:"Security software may be blocking access.", correct:false}
    ],
    feedback:{ why:"Since other devices connected fine, the router, modem, and network itself were ruled out. Inspection showed the Ethernet cable was unplugged from this PC's LAN port — a simple physical disconnection.",
      tips:["If only one device is affected, check that device first — not the network.","Physical connections are the fastest thing to rule out.","Confirm other devices work before assuming a router problem.","Don't disable security software as a first troubleshooting step."] } },

  { title:"PC Overheats and Shuts Down", icon:"🌡️", badge:"Cooling Specialist", badgeIcon:"❄️", difficulty:"Medium", est:"10 Minutes",
    scenario:"A user's computer shuts down randomly, especially during gaming or heavy tasks. It runs fine for light use like browsing.",
    objectives:["Recognize signs of overheating","Inspect cooling components","Distinguish airflow issues from hardware failure","Select the appropriate solution"],
    equipment:["Screwdriver","Flashlight","Compressed Air","Thermal Paste","Multimeter"],
    components:[
      {id:"cpuFan", name:"CPU Fan", icon:"🌀", ok:false, finding:"Caked in dust, spinning noticeably slower than normal."},
      {id:"caseFan", name:"Case Fan", icon:"🌬️", ok:true, finding:"Spinning at normal speed."},
      {id:"thermalPaste", name:"Thermal Paste", icon:"🧴", ok:true, finding:"Applied evenly, not dried out."},
      {id:"vents", name:"Air Vents", icon:"🔳", ok:true, finding:"Clear of obstructions."},
      {id:"powerSupply", name:"Power Supply", icon:"🔋", ok:true, finding:"Outputs stable voltage."},
      {id:"cpu", name:"CPU", icon:"🧩", ok:true, finding:"No physical damage detected."}
    ],
    causes:[
      {id:"fan", label:"Dust-Clogged CPU Fan", icon:"🌀", desc:"Restricted airflow is causing heat buildup.", correct:true},
      {id:"psu", label:"Damaged Power Supply", icon:"🔋", desc:"Unstable power could cause shutdowns.", correct:false},
      {id:"oc", label:"Overclocked CPU Settings", icon:"⚡", desc:"Aggressive settings may cause instability.", correct:false},
      {id:"ram", label:"Faulty RAM Module", icon:"🟩", desc:"Memory errors could trigger shutdowns.", correct:false}
    ],
    feedback:{ why:"Case airflow, thermal paste, PSU, and CPU all checked out fine. The CPU fan itself was clogged with dust and spinning far slower than it should, letting heat build up under load until the system protected itself with a shutdown.",
      tips:["Overheating symptoms often appear only under heavy load.","Dust buildup is one of the most common preventable failures.","Clean fans and vents regularly as basic maintenance.","Random shutdowns under load point to thermal, not software, issues."] } },

  { title:"Keyboard and Mouse Not Responding", icon:"⌨️", badge:"Peripheral Pro", badgeIcon:"🖱️", difficulty:"Easy", est:"7 Minutes",
    scenario:"A user's keyboard and mouse both stopped responding at the same time. The PC otherwise seems to be running normally.",
    objectives:["Identify shared-cause peripheral failures","Inspect USB connections","Rule out driver and hardware causes","Select the appropriate solution"],
    equipment:["Screwdriver","Flashlight","Multimeter","USB Tester","Replacement Cable"],
    components:[
      {id:"usbCable", name:"USB Cable", icon:"🔌", ok:false, finding:"Disconnected from the rear USB port."},
      {id:"usbPort", name:"USB Port", icon:"🔳", ok:true, finding:"Tests fine with another device."},
      {id:"keyboard", name:"Keyboard", icon:"⌨️", ok:true, finding:"Powers on, LED indicators active."},
      {id:"mouse", name:"Mouse", icon:"🖱️", ok:true, finding:"Sensor light is on."},
      {id:"motherboard", name:"Motherboard", icon:"🖥️", ok:true, finding:"USB headers show no damage."},
      {id:"drivers", name:"Drivers", icon:"💽", ok:true, finding:"Up to date in Device Manager."}
    ],
    causes:[
      {id:"usb", label:"Disconnected USB Cable", icon:"🔌", desc:"A shared USB hub cable may have come loose.", correct:true},
      {id:"drivers", label:"Outdated Drivers", icon:"💽", desc:"Peripheral drivers may need updating.", correct:false},
      {id:"mobo", label:"Faulty Motherboard", icon:"🖥️", desc:"USB headers on the board may be damaged.", correct:false},
      {id:"batteries", label:"Dead Batteries (Wireless)", icon:"🔋", desc:"Wireless peripherals may be out of power.", correct:false}
    ],
    feedback:{ why:"Both devices failed at the same time, which pointed to a shared cause rather than two coincidental hardware failures. Inspection found the USB hub cable connecting both peripherals had come loose from the rear port.",
      tips:["Multiple devices failing together usually share one root cause.","Check shared connections (hubs, cables) before individual devices.","Device Manager can quickly confirm driver status.","Don't replace hardware before ruling out simple disconnections."] } },

  { title:"No Sound From Speakers", icon:"🔇", badge:"Audio Analyst", badgeIcon:"🎧", difficulty:"Easy", est:"7 Minutes",
    scenario:"A user can't hear any audio — no sound from videos, music, or notifications — even with the volume turned up.",
    objectives:["Rule out software volume/output settings","Inspect audio cable connections","Confirm sound hardware is functioning","Select the appropriate solution"],
    equipment:["Screwdriver","Flashlight","Multimeter","Audio Tester","Replacement Cable"],
    components:[
      {id:"audioCable", name:"Audio Cable", icon:"🎧", ok:false, finding:"Not plugged into the rear audio jack."},
      {id:"speakers", name:"Speakers", icon:"🔊", ok:true, finding:"Powered on, indicator light active."},
      {id:"volume", name:"Volume Settings", icon:"🔈", ok:true, finding:"System volume is at 80%, not muted."},
      {id:"soundCard", name:"Sound Card", icon:"🎚️", ok:true, finding:"Detected properly in system settings."},
      {id:"audioDrivers", name:"Audio Drivers", icon:"💽", ok:true, finding:"Installed and up to date."},
      {id:"outputDevice", name:"Output Device", icon:"⚙️", ok:true, finding:"Correct playback device is selected."}
    ],
    causes:[
      {id:"cable", label:"Unplugged Audio Cable", icon:"🎧", desc:"The speaker cable may not be connected.", correct:true},
      {id:"volume", label:"Muted Volume Settings", icon:"🔈", desc:"System audio may be muted.", correct:false},
      {id:"soundcard", label:"Faulty Sound Card", icon:"🎚️", desc:"The onboard sound card may have failed.", correct:false},
      {id:"output", label:"Wrong Output Device Selected", icon:"⚙️", desc:"Audio may be routed elsewhere.", correct:false}
    ],
    feedback:{ why:"Volume, output device, drivers, and the sound card all checked out fine. The simple culprit was a physically unplugged audio cable at the rear jack.",
      tips:["Always check physical cable connections before software settings.","Confirm the correct output device is selected in sound settings.","A powered speaker with a light on can still have no signal.","Simple causes are common — don't skip the basics."] } },

  { title:"Date and Time Keep Resetting", icon:"⏰", badge:"BIOS Guardian", badgeIcon:"🔘", difficulty:"Medium", est:"8 Minutes",
    scenario:"Every time this PC is restarted, the system clock resets to a default date and BIOS settings don't save.",
    objectives:["Understand the role of the CMOS battery","Inspect the motherboard battery holder","Rule out other BIOS-related causes","Select the appropriate solution"],
    equipment:["Screwdriver","Flashlight","Multimeter","Replacement Battery","RAM Module"],
    components:[
      {id:"cmosBattery", name:"CMOS Battery", icon:"🔘", ok:false, finding:"Battery holder is empty — battery is dead or missing."},
      {id:"motherboard", name:"Motherboard", icon:"🖥️", ok:true, finding:"No visible damage around the battery holder."},
      {id:"biosSettings", name:"BIOS Settings", icon:"⚙️", ok:true, finding:"Reset to factory defaults, otherwise normal."},
      {id:"powerSupply", name:"Power Supply", icon:"🔋", ok:true, finding:"Delivers stable power."},
      {id:"ram", name:"RAM", icon:"🟩", ok:true, finding:"Seated properly."},
      {id:"systemClock", name:"System Clock", icon:"🕒", ok:false, finding:"Resets to January 1 every boot."}
    ],
    causes:[
      {id:"battery", label:"Dead CMOS Battery", icon:"🔘", desc:"The battery that keeps BIOS settings alive has failed.", correct:true},
      {id:"psu", label:"Faulty Power Supply", icon:"🔋", desc:"Power issues could affect the clock.", correct:false},
      {id:"bios", label:"Corrupted BIOS Settings", icon:"⚙️", desc:"BIOS configuration may be corrupted.", correct:false},
      {id:"ram", label:"Damaged RAM Module", icon:"🟩", desc:"Memory errors could affect settings storage.", correct:false}
    ],
    feedback:{ why:"The motherboard, power supply, and RAM were all fine. The battery holder was empty — a dead or missing CMOS battery is exactly why the clock and BIOS settings reset on every restart.",
      tips:["The CMOS battery is a very common, very cheap fix for clock resets.","This issue is unrelated to the main power supply.","BIOS settings resetting alongside the clock is a strong clue.","CMOS batteries typically last several years before needing replacement."] } },

  { title:"Extremely Slow Performance", icon:"🐢", badge:"Performance Tuner", badgeIcon:"⚡", difficulty:"Medium", est:"9 Minutes",
    scenario:"A student's laptop takes minutes to open simple programs, and everything feels sluggish even for basic tasks.",
    objectives:["Identify resource bottlenecks","Inspect storage and running processes","Rule out malware and hardware causes","Select the appropriate solution"],
    equipment:["Screwdriver","Task Manager","Disk Cleanup","Antivirus Tool","Flashlight"],
    components:[
      {id:"ram", name:"RAM", icon:"🟩", ok:true, finding:"Seated properly, passes basic diagnostic."},
      {id:"storage", name:"Storage Drive", icon:"💾", ok:false, finding:"95% full — very little free space remaining."},
      {id:"processes", name:"Running Processes", icon:"📊", ok:true, finding:"No single process is consuming excessive resources."},
      {id:"startup", name:"Startup Programs", icon:"🚀", ok:false, finding:"18 programs set to launch automatically at boot."},
      {id:"cpu", name:"CPU", icon:"🧩", ok:true, finding:"Running at normal temperature and clock speed."},
      {id:"malware", name:"Malware Scan", icon:"🛡️", ok:true, finding:"No threats detected."}
    ],
    causes:[
      {id:"storage", label:"Storage Drive Nearly Full", icon:"💾", desc:"Very little free space is slowing the system down.", correct:true},
      {id:"ram", label:"Faulty RAM Module", icon:"🟩", desc:"Memory could be causing slowdowns.", correct:false},
      {id:"cpu", label:"Damaged CPU", icon:"🧩", desc:"The processor itself may be failing.", correct:false},
      {id:"malware", label:"Malware Infection", icon:"🛡️", desc:"Hidden malware could be consuming resources.", correct:false}
    ],
    feedback:{ why:"RAM, CPU, and malware scans were all clean. The drive was 95% full, which severely slows down read/write operations and virtual memory — combined with too many startup programs, this explains the sluggishness.",
      tips:["A nearly-full drive is one of the most common causes of slowdowns.","Too many startup programs compound the problem.","Always rule out malware before blaming hardware.","Freeing up storage space is often a free, fast fix."] } },

  { title:"Printer Is Not Printing", icon:"🖨️", badge:"Print Shop Hero", badgeIcon:"📄", difficulty:"Easy", est:"8 Minutes",
    scenario:"A user sends a document to print, but nothing comes out — no paper feeds, and no error message appears.",
    objectives:["Understand the print queue system","Inspect printer connections and supplies","Rule out hardware causes","Select the appropriate solution"],
    equipment:["Screwdriver","Flashlight","Multimeter","Replacement Cable","Driver Update Tool"],
    components:[
      {id:"cable", name:"USB/Network Cable", icon:"🔌", ok:true, finding:"Properly connected to the printer and PC."},
      {id:"power", name:"Printer Power", icon:"🔆", ok:true, finding:"Powered on, ready light is green."},
      {id:"paper", name:"Paper Tray", icon:"📄", ok:true, finding:"Loaded with paper."},
      {id:"queue", name:"Print Queue", icon:"🗂️", ok:false, finding:"A stuck job from earlier is blocking new print requests."},
      {id:"driver", name:"Printer Driver", icon:"💽", ok:true, finding:"Installed and up to date."},
      {id:"ink", name:"Ink/Toner Level", icon:"🖋️", ok:true, finding:"Sufficient level remaining."}
    ],
    causes:[
      {id:"queue", label:"Stuck Print Queue", icon:"🗂️", desc:"A jammed job may be blocking all new prints.", correct:true},
      {id:"paper", label:"Empty Paper Tray", icon:"📄", desc:"The printer may be out of paper.", correct:false},
      {id:"cable", label:"Disconnected Cable", icon:"🔌", desc:"The printer connection may be loose.", correct:false},
      {id:"ink", label:"Low Ink/Toner", icon:"🖋️", desc:"The printer may be low on supplies.", correct:false}
    ],
    feedback:{ why:"Power, paper, cable, driver, and ink were all fine. The real issue was a stuck job in the print queue from an earlier request, silently blocking every new print job until it was cleared.",
      tips:["A jammed print queue is one of the most common 'silent' printer issues.","Clearing the queue often solves problems with no visible error message.","Check consumables (paper, ink) early since they're quick to rule out.","Printer issues are often software-side, not hardware-side."] } },

  { title:"Random Crashes and Blue Screens", icon:"💥", badge:"Memory Master", badgeIcon:"🧠", difficulty:"Hard", est:"11 Minutes",
    scenario:"A user's PC crashes to a blue error screen at random times, sometimes during simple tasks like browsing.",
    objectives:["Understand common causes of system crashes","Inspect memory and driver status","Rule out overheating and update issues","Select the appropriate solution"],
    equipment:["Screwdriver","Flashlight","Multimeter","RAM Tester","Diagnostic Tool"],
    components:[
      {id:"ram", name:"RAM", icon:"🟩", ok:false, finding:"Fails the memory diagnostic test — throws multiple errors."},
      {id:"storage", name:"Storage Drive", icon:"💾", ok:true, finding:"Passes health check, no bad sectors found."},
      {id:"drivers", name:"Device Drivers", icon:"💽", ok:true, finding:"All drivers are up to date."},
      {id:"powerSupply", name:"Power Supply", icon:"🔋", ok:true, finding:"Delivers stable voltage under load."},
      {id:"cpuTemp", name:"CPU Temperature", icon:"🌡️", ok:true, finding:"Stays within normal operating range."},
      {id:"updates", name:"System Updates", icon:"🔄", ok:true, finding:"Operating system is fully up to date."}
    ],
    causes:[
      {id:"ram", label:"Faulty RAM Module", icon:"🟩", desc:"Failing memory can cause random crashes.", correct:true},
      {id:"drivers", label:"Outdated Device Drivers", icon:"💽", desc:"Old drivers can cause instability.", correct:false},
      {id:"cpu", label:"Overheating CPU", icon:"🌡️", desc:"High temperatures could trigger crashes.", correct:false},
      {id:"updates", label:"Corrupted System Updates", icon:"🔄", desc:"A bad update could destabilize the OS.", correct:false}
    ],
    feedback:{ why:"Storage, drivers, power, temperature, and updates all checked out fine. The RAM module failed a memory diagnostic test with multiple errors — faulty memory is a classic cause of random, unpredictable crashes.",
      tips:["Random crashes (not tied to one task) often point to memory issues.","A memory diagnostic test is the fastest way to confirm or rule out RAM.","Rule out overheating and driver issues in parallel.","Faulty RAM can pass a visual check but still fail electrically."] } }
];

// ---------------- PLAYER / GAME STATE ----------------
let PLAYER = { name:"Student", level:1, xp:0, xpToNext:1000, coins:0, badges:[], accSum:0, missionsDone:0 };
let RUN = { missionIndex:0, inspected:new Set(), selectedComponent:null, selectedTool:null, selectedCause:null,
  reasonText:"", wrongAttempts:0, startTime:0, lastResult:null };

const app = document.getElementById("app");
function fmtTime(sec){ const m=Math.floor(sec/60).toString().padStart(2,"0"); const s=Math.floor(sec%60).toString().padStart(2,"0"); return m+":"+s; }
function shuffle(arr){ return arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]); }
function currentMission(){ return MISSIONS[RUN.missionIndex]; }

// ---------------- SHARED CHROME ----------------
function navbar(){
  return `
    <div class="navbar">
      <div class="nav-brand">
        <div class="nav-logo">🛠️</div>
        <div><div class="nav-title">TechFix</div><div class="nav-sub">Computer Troubleshooting Simulation Game</div></div>
      </div>
      <div class="nav-right">
        <div class="nav-profile">
          <div class="avatar">🧑‍💻</div>
          <div><div class="nav-name">${PLAYER.name}</div><span class="lvl-pill">Level ${PLAYER.level}</span></div>
        </div>
        <button class="gear-btn" onclick="openSettings()">⚙️</button>
      </div>
    </div>`;
}

function dashboardCard(){
  const pct = Math.min(100, Math.round((PLAYER.xp/PLAYER.xpToNext)*100));
  const avgAcc = PLAYER.missionsDone ? Math.round(PLAYER.accSum/PLAYER.missionsDone) : 0;
  return `
    <div class="card">
      <div class="card-head">Player Dashboard</div>
      <div class="card-body">
        <div class="dash-row">
          <div class="dash-avatar">🧑‍💻</div>
          <div><div class="dash-name">${PLAYER.name}</div><span class="lvl-pill">Level ${PLAYER.level}</span></div>
        </div>
        <div class="xp-track"><div class="xp-fill" style="width:${pct}%;"></div></div>
        <div class="xp-label"><span>${PLAYER.xp}/${PLAYER.xpToNext} XP</span><span>${pct}%</span></div>
        <div class="rank-line">Current Rank: <b>${rankTitle()}</b></div>
        <div class="stat-grid">
          <div class="stat-box"><div class="n">${PLAYER.coins}</div><div class="l">Tech Coins</div></div>
          <div class="stat-box"><div class="n">${avgAcc}%</div><div class="l">Accuracy</div></div>
          <div class="stat-box"><div class="n">${PLAYER.missionsDone}/${MISSIONS.length}</div><div class="l">Missions</div></div>
          <div class="stat-box"><div class="n">${PLAYER.badges.length}</div><div class="l">Badges</div></div>
        </div>
      </div>
    </div>`;
}
function rankTitle(){
  if(PLAYER.level >= 4) return "Advanced Technician";
  if(PLAYER.level >= 2) return "Junior Technician";
  return "Beginner";
}

function openSettings(){
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.innerHTML = `
    <div class="modal-box">
      <h3>Settings</h3>
      <p>Manage your TechFix session.</p>
      <div style="margin-bottom:14px;">
        <label style="font-size:11px; color:var(--text-dim); text-transform:uppercase; display:block; margin-bottom:6px;">Technician Name</label>
        <input id="nameInput" type="text" value="${PLAYER.name}" style="width:100%; padding:10px 12px; border:1px solid var(--line); border-radius:8px; font-family:var(--sans);">
      </div>
      <div class="modal-actions">
        <button class="btn ghost sm" id="closeSettings">Close</button>
        <button class="btn sm" id="saveSettings">Save</button>
      </div>
      <div style="margin-top:14px; border-top:1px solid var(--line); padding-top:14px;">
        <button class="btn ghost sm" id="restartGame" style="color:var(--red);">Restart Game (clear all progress)</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector("#closeSettings").onclick = ()=> overlay.remove();
  overlay.querySelector("#saveSettings").onclick = ()=>{
    const v = overlay.querySelector("#nameInput").value.trim();
    if(v) PLAYER.name = v;
    overlay.remove();
    renderCurrentScreen();
  };
  overlay.querySelector("#restartGame").onclick = ()=>{
    if(confirm("This will erase all progress, XP, and badges. Continue?")){
      PLAYER = { name:PLAYER.name, level:1, xp:0, xpToNext:1000, coins:0, badges:[], accSum:0, missionsDone:0 };
      RUN = { missionIndex:0, inspected:new Set(), selectedComponent:null, selectedTool:null, selectedCause:null, reasonText:"", wrongAttempts:0, startTime:0, lastResult:null };
      overlay.remove();
      renderHome();
    }
  };
}

let CURRENT_SCREEN = "home";
function renderCurrentScreen(){
  ({ home:renderHome, howto:renderHowTo, briefing:renderBriefing, troubleshoot:renderTroubleshoot,
     diagnosis:renderDiagnosis, results:renderResults, achievements:renderAchievements })[CURRENT_SCREEN]();
}

// ---------------- HOME ----------------
function renderHome(){
  CURRENT_SCREEN = "home";
  const nextMission = RUN.missionIndex < MISSIONS.length ? MISSIONS[RUN.missionIndex] : null;
  const dots = MISSIONS.map((m,i)=>{
    const cls = i < RUN.missionIndex ? "done" : (i === RUN.missionIndex ? "current" : "");
    return `<div class="mdot ${cls}">${i < RUN.missionIndex ? "✓" : (i+1)}</div>`;
  }).join("");

  app.innerHTML = `
    ${navbar()}
    <div class="grid3">
      <div>
        <div class="hero-block">
          <div class="hero-title">Tech<span>Fix</span></div>
          <div class="hero-sub">Computer Troubleshooting Simulation Game</div>
        </div>
        <div class="home-actions">
          <div class="tile-btn" onclick="renderHowTo()"><div class="ti">❓</div><div class="tt">How to Play</div></div>
          <div class="tile-btn" onclick="renderAchievements()"><div class="ti">🏆</div><div class="tt">Achievements</div></div>
        </div>
      </div>
      <div>
        ${nextMission ? `
        <div class="mission-card">
          <div class="mission-icon">${nextMission.icon}</div>
          <div class="mission-info">
            <div class="lbl">Today's Mission</div>
            <div class="name">${nextMission.title}</div>
            <div class="mission-meta">
              <span class="pill easy">${nextMission.difficulty}</span>
              <span class="pill">⭐ +100 XP</span>
              <span class="pill">🪙 +50 Coins</span>
              <span class="pill">⏱ ${nextMission.est}</span>
            </div>
          </div>
        </div>
        <div class="btn-row" style="justify-content:flex-start;">
          <button class="btn" onclick="renderBriefing()">▶ START MISSION</button>
        </div>` : `
        <div class="mission-card">
          <div class="mission-icon">🏁</div>
          <div class="mission-info"><div class="lbl">All Missions Complete</div><div class="name">Great work, Technician!</div></div>
        </div>`}
        <div class="progress-strip">
          <div class="lbl">Mission Progress: ${RUN.missionIndex}/${MISSIONS.length} Completed</div>
          <div class="mission-dots">${dots}</div>
        </div>
      </div>
      <div>${dashboardCard()}</div>
    </div>
  `;
}

// ---------------- HOW TO PLAY ----------------
function renderHowTo(){
  CURRENT_SCREEN = "howto";
  app.innerHTML = `
    ${navbar()}
    <div class="grid3">
      <div class="card">
        <div class="card-head">Game Overview</div>
        <div class="card-body">
          <p style="font-size:13.5px; color:var(--text-dim); line-height:1.6; margin-bottom:14px;">Learn how to diagnose and solve common computer hardware problems through interactive troubleshooting missions. Inspect components, apply reasoning, and earn XP, Tech Coins, and badges as you improve your skills.</p>
          <ul class="tip-list">
            <li>10 realistic troubleshooting missions</li>
            <li>Hands-on component inspection</li>
            <li>XP, coins, and badge rewards</li>
            <li>Educational feedback after every mission</li>
          </ul>
        </div>
      </div>
      <div class="card">
        <div class="card-head">Step-by-Step Tutorial</div>
        <div class="card-body">
          <div class="step-card"><span class="step-num">Step 1</span><div class="t">🎯 Select a Mission</div><div class="d">Choose a troubleshooting mission from the home screen.</div></div>
          <div class="step-card"><span class="step-num">Step 2</span><div class="t">🔍 Inspect Components</div><div class="d">Click each component and press Inspect to examine its condition.</div></div>
          <div class="step-card"><span class="step-num">Step 3</span><div class="t">🧰 Use the Right Tools</div><div class="d">Select tools like a Multimeter or PSU Tester to aid your inspection.</div></div>
          <div class="step-card"><span class="step-num">Step 4</span><div class="t">🧠 Analyze the Evidence</div><div class="d">Review your findings and identify the most likely cause.</div></div>
          <div class="step-card"><span class="step-num">Step 5</span><div class="t">✅ Submit Your Diagnosis</div><div class="d">Choose the correct cause, explain your reasoning, and receive feedback and rewards.</div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-head">Tips for Success</div>
        <div class="card-body">
          <ul class="tip-list">
            <li>Always inspect before guessing.</li>
            <li>Follow the troubleshooting process step by step.</li>
            <li>Read every finding carefully.</li>
            <li>Rule out the simplest causes first.</li>
            <li>Learn from the feedback after every mission.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="btn-row"><button class="btn ghost" onclick="renderHome()">◂ Back to Home</button></div>
  `;
}

// ---------------- BRIEFING ----------------
function renderBriefing(){
  CURRENT_SCREEN = "briefing";
  const m = currentMission();
  app.innerHTML = `
    ${navbar()}
    <div class="grid2">
      <div>
        <div class="brief-hero">
          <div class="k">Mission Briefing</div>
          <div class="t">Mission ${RUN.missionIndex+1}: ${m.title}</div>
        </div>
        <div class="card"><div class="card-body">
          <div class="info-row">
            <div class="info-cell"><div class="k">Difficulty</div><div class="v">${m.difficulty}</div></div>
            <div class="info-cell"><div class="k">Estimated Time</div><div class="v">${m.est}</div></div>
            <div class="info-cell"><div class="k">Rewards</div><div class="v">⭐ +100 XP · 🪙 +50 Coins</div></div>
          </div>
          <div class="scenario-box"><b>Scenario</b><br>${m.scenario}</div>
          <div class="two-col">
            <div class="mini-card">
              <div class="h">Learning Objectives</div>
              ${m.objectives.map(o=>`<div class="obj-item"><span class="ck">•</span>${o}</div>`).join("")}
            </div>
            <div class="mini-card">
              <div class="h">Equipment Available</div>
              <div class="equip-row">${m.equipment.map(e=>`<div class="equip-chip"><span class="ei">${TOOL_ICONS[e]||"🔧"}</span>${e}</div>`).join("")}</div>
            </div>
          </div>
          <div class="btn-row between">
            <button class="btn ghost" onclick="renderHome()">Back</button>
            <button class="btn" onclick="startTroubleshoot()">▶ BEGIN TROUBLESHOOTING</button>
          </div>
        </div></div>
      </div>
      <div>
        ${dashboardCard()}
        <div class="obj-card">
          <div class="h">Mission Objectives</div>
          ${m.objectives.map(o=>`<div class="obj-item"><span class="ck">✓</span>${o}</div>`).join("")}
        </div>
      </div>
    </div>
  `;
}

function startTroubleshoot(){
  RUN.inspected = new Set();
  RUN.selectedComponent = null;
  RUN.selectedTool = null;
  RUN.selectedCause = null;
  RUN.reasonText = "";
  RUN.wrongAttempts = 0;
  RUN.startTime = Date.now();
  renderTroubleshoot();
}

// ---------------- TROUBLESHOOT ----------------
function renderTroubleshoot(){
  CURRENT_SCREEN = "troubleshoot";
  const m = currentMission();
  const pct = Math.round((RUN.inspected.size/m.components.length)*100);
  const sel = RUN.selectedComponent ? m.components.find(c=>c.id===RUN.selectedComponent) : null;

  app.innerHTML = `
    ${navbar()}
    <div class="progress-top">
      <div class="t">Ticket ${RUN.missionIndex+1} of ${MISSIONS.length}</div>
      <div class="track"><div class="fill" style="width:${((RUN.missionIndex)/MISSIONS.length)*100}%;"></div></div>
    </div>
    <div class="grid3">
      <div class="card">
        <div class="card-head">🧰 Troubleshooting: ${m.title}</div>
        <div class="card-body">
          <div class="tools-row">
            ${m.equipment.map(t=>`<div class="tool-chip ${RUN.selectedTool===t?'active':''}" onclick="selectTool('${t}')"><span class="ti">${TOOL_ICONS[t]||"🔧"}</span>${t}</div>`).join("")}
          </div>
          <div class="prog-wrap">
            <div class="prog-track"><div class="prog-fill" style="width:${pct}%;"></div></div>
            <div class="prog-label"><span>Inspection Progress</span><span>${RUN.inspected.size}/${m.components.length} (${pct}%)</span></div>
          </div>
          <div class="comp-grid">
            ${m.components.map(c=>`
              <div class="comp-tile ${RUN.selectedComponent===c.id?'selected':''}" onclick="selectComponent('${c.id}')">
                <div class="status-dot ${RUN.inspected.has(c.id)?'done':''}"></div>
                <div class="ci">${c.icon}</div>
                <div class="cn">${c.name}</div>
              </div>`).join("")}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-head">Component Details</div>
        <div class="card-body">
          ${sel ? `
            <div class="detail-box">
              <div class="h">${sel.icon} ${sel.name}</div>
              <span class="status-badge ${RUN.inspected.has(sel.id) ? (sel.ok?'ok':'pending') : 'pending'}">
                ${RUN.inspected.has(sel.id) ? (sel.ok ? "Normal" : "Needs Attention") : "Not Yet Inspected"}
              </span>
              ${RUN.inspected.has(sel.id) ? `<div class="finding-box">${sel.finding}</div>` : `<div class="finding-box">Click Inspect to examine this component.</div>`}
              <div class="btn-row" style="justify-content:flex-start; margin-top:12px;">
                <button class="btn sm" onclick="inspectComponent('${sel.id}')">🔍 Inspect</button>
                <button class="btn ghost sm" onclick="testComponent('${sel.id}')">⚡ Test${RUN.selectedTool? " with "+RUN.selectedTool : ""}</button>
                <button class="btn ghost sm" onclick="resetComponent('${sel.id}')">↺ Reset</button>
              </div>
            </div>
          ` : `<div class="detail-box"><div class="h">No Component Selected</div><div class="finding-box">Click a component on the left to begin inspecting it.</div></div>`}
          <div class="mini-card">
            <div class="h">Inspection Checklist</div>
            <div class="checklist-mini">
              ${m.components.map(c=>`<div class="ci-item ${RUN.inspected.has(c.id)?'on':''}">${RUN.inspected.has(c.id)?'✓':'○'} ${c.name}</div>`).join("")}
            </div>
          </div>
          <div class="btn-row between">
            <button class="btn ghost" onclick="renderBriefing()">◂ Back</button>
            <button class="btn" id="submitDiagBtn" ${RUN.inspected.size < m.components.length ? "disabled" : ""} onclick="renderDiagnosis()">Submit Diagnosis ▸</button>
          </div>
        </div>
      </div>
      <div>${dashboardCard()}</div>
    </div>
  `;
}
function selectTool(t){ RUN.selectedTool = (RUN.selectedTool===t? null : t); renderTroubleshoot(); }
function selectComponent(id){ RUN.selectedComponent = id; renderTroubleshoot(); }
function inspectComponent(id){ RUN.inspected.add(id); renderTroubleshoot(); }
function testComponent(id){ RUN.inspected.add(id); renderTroubleshoot(); }
function resetComponent(id){ RUN.inspected.delete(id); renderTroubleshoot(); }

// ---------------- DIAGNOSIS ----------------
function renderDiagnosis(){
  CURRENT_SCREEN = "diagnosis";
  const m = currentMission();
  if(!m._shuffledCauses) m._shuffledCauses = shuffle(m.causes);

  app.innerHTML = `
    ${navbar()}
    <div class="progress-top">
      <div class="t">Ticket ${RUN.missionIndex+1} of ${MISSIONS.length}</div>
      <div class="track"><div class="fill" style="width:${((RUN.missionIndex)/MISSIONS.length)*100}%;"></div></div>
    </div>
    <div class="grid3">
      <div class="card">
        <div class="card-head">Inspection Summary</div>
        <div class="card-body">
          <div style="font-size:13px; margin-bottom:10px;">
            <b>Mission:</b> ${m.title}<br>
            <b>Difficulty:</b> ${m.difficulty}<br>
            <b>Components Inspected:</b> ${m.components.length}/${m.components.length} ✓
          </div>
          <div class="prog-track"><div class="prog-fill" style="width:100%;"></div></div>
          <div class="checklist-mini" style="margin-top:12px;">
            ${m.components.map(c=>`<div class="ci-item on">✓ ${c.name}</div>`).join("")}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-head">Choose the Most Likely Cause</div>
        <div class="card-body">
          <div class="cause-grid" id="causeGrid">
            ${m._shuffledCauses.map(c=>`
              <div class="cause-card ${RUN.selectedCause===c.id?'selected':''}" onclick="selectCause('${c.id}')">
                <span class="cause-check">✓</span>
                <div class="ci">${c.icon}</div>
                <div><div class="ct">${c.label}</div><div class="cd">${c.desc}</div></div>
              </div>`).join("")}
          </div>
          <div style="margin-top:8px;">
            <label style="font-size:12px; font-weight:700; color:var(--navy); display:block; margin-bottom:6px;">Reason for Your Answer</label>
            <textarea class="reason" id="reasonInput" placeholder="Using the evidence collected from your inspection, explain why you selected this diagnosis...">${RUN.reasonText}</textarea>
          </div>
          <div class="tip-banner">💡 <span><b>Tech Tip:</b> Review all inspection results carefully. A single overlooked finding can change the outcome.</span></div>
          <div class="btn-row between">
            <button class="btn ghost" onclick="renderTroubleshoot()">◂ Previous Step</button>
            <button class="btn ghost" onclick="showHint()">💡 Hint</button>
            <button class="btn" id="submitBtn" onclick="openConfirmModal()">✅ Submit Diagnosis</button>
          </div>
          <div class="feedback" id="diagFeedback" style="display:none;"></div>
        </div>
      </div>
      <div>${dashboardCard()}</div>
    </div>
  `;
}
function selectCause(id){ RUN.selectedCause = id; renderDiagnosis(); }
function showHint(){
  const m = currentMission();
  const badFinding = m.components.find(c=>!c.ok);
  alert("Hint: Take another look at " + badFinding.name + ". " + badFinding.finding);
}
function openConfirmModal(){
  RUN.reasonText = document.getElementById("reasonInput").value.trim();
  if(!RUN.selectedCause){ alert("Please select a cause first."); return; }
  if(RUN.reasonText.length < 8){ alert("Please briefly explain your reasoning before submitting."); return; }

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.innerHTML = `
    <div class="modal-box">
      <h3>Confirm Submission?</h3>
      <p>Are you sure you want to submit this diagnosis and explanation?</p>
      <div class="modal-actions">
        <button class="btn ghost sm" id="editDiag">Edit Diagnosis</button>
        <button class="btn sm" id="confirmDiag">✅ Confirm and Submit</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector("#editDiag").onclick = ()=> overlay.remove();
  overlay.querySelector("#confirmDiag").onclick = ()=>{
    overlay.remove();
    evaluateDiagnosis();
  };
}
function evaluateDiagnosis(){
  const m = currentMission();
  const chosen = m.causes.find(c=>c.id===RUN.selectedCause);
  const fb = document.getElementById("diagFeedback");
  if(chosen && chosen.correct){
    completeMission();
  } else {
    RUN.wrongAttempts++;
    fb.style.display = "block";
    fb.className = "feedback show bad";
    fb.style.cssText = "display:block; background:#fdecec; color:#a52424; border:1px solid #f3c9c9; border-radius:10px; padding:12px 14px; font-size:13px; margin-top:12px;";
    fb.textContent = "✘ That doesn't match the inspection evidence. Review your findings and pick a different cause.";
  }
}

// ---------------- RESULTS ----------------
function accuracyForAttempts(w){ if(w===0) return 100; if(w===1) return 75; if(w===2) return 50; return 30; }
function performanceRank(w){ if(w===0) return "Expert"; if(w===1) return "Skilled"; return "Beginner"; }

function completeMission(){
  const m = currentMission();
  const elapsed = (Date.now()-RUN.startTime)/1000;
  const accuracy = accuracyForAttempts(RUN.wrongAttempts);
  const rank = performanceRank(RUN.wrongAttempts);

  PLAYER.xp += 100;
  PLAYER.coins += 50;
  PLAYER.accSum += accuracy;
  PLAYER.missionsDone += 1;
  if(!PLAYER.badges.includes(m.badge)) PLAYER.badges.push(m.badge);
  while(PLAYER.xp >= PLAYER.xpToNext){ PLAYER.xp -= PLAYER.xpToNext; PLAYER.level += 1; }

  RUN.lastResult = { mission:m, accuracy, rank, time:elapsed, wrongAttempts:RUN.wrongAttempts };
  RUN.missionIndex += 1;
  renderResults();
}

function renderResults(){
  CURRENT_SCREEN = "results";
  const r = RUN.lastResult;
  const m = r.mission;
  const chosen = m.causes.find(c=>c.correct);
  const tipColors = ["#3aa0e0","#9b6bd1","#2ecc71","#f5a623"];

  app.innerHTML = `
    ${navbar()}
    <div class="progress-top">
      <div class="t">Mission ${RUN.missionIndex} of ${MISSIONS.length}</div>
      <div class="track"><div class="fill" style="width:${(RUN.missionIndex/MISSIONS.length)*100}%;"></div></div>
    </div>
    <div class="grid3">
      <div class="card">
        <div class="card-head">Mission Results</div>
        <div class="card-body">
          <div class="result-status">🎉 Mission Complete!</div>
          <div class="result-line"><span>Mission</span><b>${m.title}</b></div>
          <div class="result-line"><span>Status</span><b style="color:var(--green);">Mission Completed ✔</b></div>
          <div class="result-line"><span>Diagnosis</span><b>${chosen.label}</b></div>
          <div class="result-line"><span>Accuracy</span><b>${r.accuracy}%</b></div>
          <div class="result-line"><span>Difficulty</span><b>${m.difficulty}</b></div>
          <div class="result-line"><span>Time Taken</span><b>${fmtTime(r.time)}</b></div>
          <div class="rank-badge">🏅 Performance Rank: ${r.rank}</div>
        </div>
      </div>
      <div class="card">
        <div class="card-head">Educational Feedback</div>
        <div class="card-body">
          <div class="h" style="font-weight:700; color:var(--navy); margin-bottom:6px;">Why is this Correct?</div>
          <div class="why-box">${m.feedback.why}</div>
          <div class="tip-grid">
            ${m.feedback.tips.map((t,i)=>`<div class="tip-tile" style="background:${tipColors[i%4]};">${t}</div>`).join("")}
          </div>
        </div>
      </div>
      <div>
        ${dashboardCard()}
        <div class="card rewards-card">
          <div class="card-head">Rewards Card</div>
          <div class="card-body">
            <div class="reward-line">⭐ +100 XP</div>
            <div class="reward-line">🪙 +50 Tech Coins</div>
            <div class="badge-earned"><div class="bi">${m.badgeIcon}</div><div class="bt">${m.badge}</div><div style="font-size:11px; opacity:.85;">Badge Earned!</div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-row">
      <button class="btn ghost" onclick="renderHome()">🏠 Return to Home</button>
      <button class="btn ghost" onclick="retryMission()">🔄 Retry Mission</button>
      ${RUN.missionIndex < MISSIONS.length ? `<button class="btn" onclick="renderBriefing()">➔ Next Mission</button>` : `<button class="btn" onclick="renderHome()">🏁 Finish Game</button>`}
    </div>
  `;
}
function retryMission(){ RUN.missionIndex -= 1; renderBriefing(); }

// ---------------- ACHIEVEMENTS ----------------
function renderAchievements(){
  CURRENT_SCREEN = "achievements";
  app.innerHTML = `
    ${navbar()}
    <div class="card">
      <div class="card-head">🏆 Achievements</div>
      <div class="card-body">
        <div class="ach-grid">
          ${MISSIONS.map(m=>{
            const unlocked = PLAYER.badges.includes(m.badge);
            return `<div class="ach-tile ${unlocked?'unlocked':''}"><div class="ai">${m.badgeIcon}</div><div class="at">${m.badge}</div></div>`;
          }).join("")}
        </div>
      </div>
    </div>
    <div class="btn-row"><button class="btn ghost" onclick="renderHome()">◂ Back to Home</button></div>
  `;
}

// ---------------- INIT ----------------
renderHome();
