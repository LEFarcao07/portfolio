document.addEventListener("DOMContentLoaded", function () {
  // Theme toggle
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById(
    "theme-toggle-light-icon"
  );

  if (
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    themeToggleLightIcon.classList.remove("hidden");
    themeToggleDarkIcon.classList.add("hidden");
  } else {
    themeToggleLightIcon.classList.add("hidden");
    themeToggleDarkIcon.classList.remove("hidden");
  }

  themeToggleBtn.addEventListener("click", function () {
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");

    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  });

  // CIDR to subnet mask mapping
  const cidrToMask = {
    "/8": "255.0.0.0",
    "/16": "255.255.0.0",
    "/24": "255.255.255.0",
    "/25": "255.255.255.128",
    "/26": "255.255.255.192",
    "/27": "255.255.255.224",
    "/28": "255.255.255.240",
    "/29": "255.255.255.248",
    "/30": "255.255.255.252",
  };

  // Subnet mask to CIDR mapping
  const maskToCidr = {
    "255.0.0.0": "/8",
    "255.255.0.0": "/16",
    "255.255.255.0": "/24",
    "255.255.255.128": "/25",
    "255.255.255.192": "/26",
    "255.255.255.224": "/27",
    "255.255.255.240": "/28",
    "255.255.255.248": "/29",
    "255.255.255.252": "/30",
  };

  // Event listeners for CIDR and subnet mask sync
  document
    .getElementById("cidr-select")
    .addEventListener("change", function () {
      const cidr = this.value;
      document.getElementById("subnet-mask").value = cidrToMask[cidr];
    });

  document.getElementById("subnet-mask").addEventListener("input", function () {
    const mask = this.value.trim();
    if (maskToCidr[mask]) {
      document.getElementById("cidr-select").value = maskToCidr[mask];
    }
  });

  // Calculate button
  document
    .getElementById("calculate-btn")
    .addEventListener("click", calculateSubnet);

  // Helper functions
  function ipToBinary(ip) {
    return ip
      .split(".")
      .map((octet) => {
        return parseInt(octet, 10).toString(2).padStart(8, "0");
      })
      .join(".");
  }

  function ipToNumber(ip) {
    return ip.split(".").reduce((acc, octet, idx) => {
      return acc + (parseInt(octet) << (8 * (3 - idx)));
    }, 0);
  }

  function numberToIp(num) {
    return [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255,
    ].join(".");
  }

  function getWildcardMask(mask) {
    return mask
      .split(".")
      .map((octet) => {
        return (255 - parseInt(octet)).toString();
      })
      .join(".");
  }

  function getNetworkClass(ip) {
    const firstOctet = parseInt(ip.split(".")[0]);
    if (firstOctet < 128) return "A";
    if (firstOctet < 192) return "B";
    if (firstOctet < 224) return "C";
    if (firstOctet < 240) return "D (Multicast)";
    return "E (Experimental)";
  }

  function isPrivateIP(ip) {
    const parts = ip.split(".").map(Number);
    // 10.0.0.0 - 10.255.255.255
    if (parts[0] === 10) return true;
    // 172.16.0.0 - 172.31.255.255
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    // 192.168.0.0 - 192.168.255.255
    if (parts[0] === 192 && parts[1] === 168) return true;
    return false;
  }

  function validateIP(ip) {
    const parts = ip.split(".");
    if (parts.length !== 4) return false;
    return parts.every((part) => {
      const num = parseInt(part, 10);
      return num >= 0 && num <= 255 && part === num.toString();
    });
  }

  function validateSubnetMask(mask) {
    if (!validateIP(mask)) return false;

    // Convert mask to binary string
    const binary = mask
      .split(".")
      .map((octet) => {
        return parseInt(octet, 10).toString(2).padStart(8, "0");
      })
      .join("");

    // Check if the mask is a sequence of 1s followed by 0s
    let foundZero = false;
    for (let i = 0; i < binary.length; i++) {
      if (binary[i] === "0") {
        foundZero = true;
      } else if (foundZero && binary[i] === "1") {
        return false;
      }
    }
    return true;
  }

  // Main calculation function
  function calculateSubnet() {
    const ipAddress = document.getElementById("ip-address").value.trim();
    let subnetMask = document.getElementById("subnet-mask").value.trim();
    const cidrSelect = document.getElementById("cidr-select");

    // Validate inputs with SweetAlert2
    if (!validateIP(ipAddress)) {
      Swal.fire({
        icon: "error",
        title: "Invalid IP Address",
        text: "Please enter a valid IP address (e.g., 192.168.1.1)",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }

    if (!validateSubnetMask(subnetMask)) {
      // Check if CIDR is selected and use that
      if (maskToCidr[subnetMask]) {
        subnetMask = cidrToMask[cidrSelect.value];
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Subnet Mask",
          text: "Please enter a valid subnet mask (e.g., 255.255.255.0)",
          confirmButtonColor: "#3B82F6",
        });
        return;
      }
    }

    // Calculate CIDR notation
    const cidr = subnetMask.split(".").reduce((acc, octet) => {
      return acc + (parseInt(octet).toString(2).match(/1/g) || []).length;
    }, 0);

    // Update CIDR select to match the mask
    if (maskToCidr[subnetMask]) {
      cidrSelect.value = maskToCidr[subnetMask];
    }

    // Convert IP and mask to numbers
    const ipNumber = ipToNumber(ipAddress);
    const maskNumber = ipToNumber(subnetMask);

    // Calculate network address
    const networkNumber = ipNumber & maskNumber;
    const networkAddress = numberToIp(networkNumber);

    // Calculate broadcast address
    const wildcardNumber = ipToNumber(getWildcardMask(subnetMask));
    const broadcastNumber = ipNumber | wildcardNumber;
    const broadcastAddress = numberToIp(broadcastNumber);

    // Calculate first and last host
    const firstHostNumber = networkNumber + 1;
    const lastHostNumber = broadcastNumber - 1;
    const firstHost = numberToIp(firstHostNumber);
    const lastHost = numberToIp(lastHostNumber);

    // Calculate number of hosts
    const numberOfHosts = Math.pow(2, 32 - cidr) - 2;
    const usableHosts = numberOfHosts < 0 ? 0 : numberOfHosts;

    // Calculate network class and type
    const networkClass = getNetworkClass(ipAddress);
    const ipType = isPrivateIP(ipAddress) ? "Privat" : "Publik";

    // Calculate block size (for classful networks)
    let blockSize = "N/A";
    if (cidr <= 8) blockSize = "16,777,214 host";
    else if (cidr <= 16) blockSize = "65,534 host";
    else if (cidr <= 24) blockSize = "254 host";
    else blockSize = Math.pow(2, 32 - cidr) + " host";

    // Update the UI with results
    document.getElementById("ip-result").textContent = ipAddress;
    document.getElementById("mask-result").textContent = subnetMask;
    document.getElementById("cidr-result").textContent = "/" + cidr;
    document.getElementById("wildcard-result").textContent =
      getWildcardMask(subnetMask);
    document.getElementById("network-result").textContent = networkAddress;
    document.getElementById("broadcast-result").textContent = broadcastAddress;
    document.getElementById("range-result").textContent =
      firstHost + " - " + lastHost;
    document.getElementById("hosts-result").textContent = numberOfHosts;
    document.getElementById("usable-hosts-result").textContent = usableHosts;
    document.getElementById("block-result").textContent = blockSize;
    document.getElementById("class-result").textContent = networkClass;
    document.getElementById("ip-type-result").textContent = ipType;

    // Binary representations
    document.getElementById("binary-ip-result").textContent =
      ipToBinary(ipAddress);
    document.getElementById("binary-mask-result").textContent =
      ipToBinary(subnetMask);
    document.getElementById("binary-network-result").textContent =
      ipToBinary(networkAddress);

    // Visualize IP range
    visualizeIPRange(
      networkAddress,
      broadcastAddress,
      firstHost,
      lastHost,
      cidr
    );

    // Show results
    document.getElementById("results").classList.remove("hidden");
  }

  function visualizeIPRange(network, broadcast, firstHost, lastHost, cidr) {
    const container = document.getElementById("ip-markers");
    container.innerHTML = "";

    const networkNum = ipToNumber(network);
    const broadcastNum = ipToNumber(broadcast);
    const firstHostNum = ipToNumber(firstHost);
    const lastHostNum = ipToNumber(lastHost);

    const totalWidth = broadcastNum - networkNum + 1;

    // Set network and host portion highlights
    const networkPortion = document.getElementById("network-portion");
    const hostPortion = document.getElementById("host-portion");

    const networkWidthPercent = (Math.pow(2, 32 - cidr) / totalWidth) * 100;

    networkPortion.style.left = "0%";
    networkPortion.style.width = `${networkWidthPercent}%`;

    hostPortion.style.left = `${networkWidthPercent}%`;
    hostPortion.style.width = `${100 - networkWidthPercent}%`;

    // Create a better visualization with tooltips
    const visualizationContainer = document.createElement("div");
    visualizationContainer.className = "relative h-16 w-full";

    // Create the main bar
    const mainBar = document.createElement("div");
    mainBar.className =
      "absolute top-1/2 left-0 right-0 h-4 bg-gray-200 dark:bg-gray-600 rounded-full";
    visualizationContainer.appendChild(mainBar);

    // Create markers with tooltips
    const positions = [
      { pos: 0, label: "Network", ip: network, color: "bg-red-500" },
      {
        pos: ((firstHostNum - networkNum) / totalWidth) * 100,
        label: "First Host",
        ip: firstHost,
        color: "bg-blue-500",
      },
      {
        pos: ((lastHostNum - networkNum) / totalWidth) * 100,
        label: "Last Host",
        ip: lastHost,
        color: "bg-green-500",
      },
      { pos: 100, label: "Broadcast", ip: broadcast, color: "bg-purple-500" },
    ];

    positions.forEach((item) => {
      const markerGroup = document.createElement("div");
      markerGroup.className = "absolute flex flex-col items-center";
      markerGroup.style.left = `calc(${item.pos}% - 0.5rem)`;
      markerGroup.style.top = "0";

      // Marker dot
      const marker = document.createElement("div");
      marker.className = `w-4 h-4 rounded-full ${item.color} border-2 border-white dark:border-gray-800 shadow-md cursor-pointer`;
      marker.dataset.tooltip = `${item.label}: ${item.ip}`;

      // Tooltip
      const tooltip = document.createElement("div");
      tooltip.className =
        "absolute hidden bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap -translate-x-1/2 mt-6";
      tooltip.textContent = `${item.label}: ${item.ip}`;

      marker.addEventListener("mouseenter", () => {
        tooltip.classList.remove("hidden");
      });

      marker.addEventListener("mouseleave", () => {
        tooltip.classList.add("hidden");
      });

      markerGroup.appendChild(marker);
      markerGroup.appendChild(tooltip);
      visualizationContainer.appendChild(markerGroup);
    });

    // Add range labels at the bottom
    const rangeLabelContainer = document.createElement("div");
    rangeLabelContainer.className =
      "absolute left-0 right-0 bottom-0 flex justify-between text-xs text-gray-600 dark:text-gray-300";

    const startLabel = document.createElement("div");
    startLabel.textContent = network;

    const endLabel = document.createElement("div");
    endLabel.textContent = broadcast;

    rangeLabelContainer.appendChild(startLabel);
    rangeLabelContainer.appendChild(endLabel);
    visualizationContainer.appendChild(rangeLabelContainer);

    container.appendChild(visualizationContainer);
  }
});
