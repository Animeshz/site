import{_ as n,c as a,b as e,t as l,a as p,o}from"./app.a9289f76.js";const r="/site/assets/battery-saving-video-decoding.c30735bc.jpg",t="/site/assets/battery-saving-video-decoding-true.e284433f.jpg",c="/site/assets/battery-saving-enhanced-264ify.055cfd66.jpg",h=JSON.parse('{"title":"Linux Setup (Post Install)","description":"","frontmatter":{"title":"Linux Setup (Post Install)","slug":"linux-setup"},"headers":[{"level":2,"title":"Good to know Keybinds","slug":"good-to-know-keybinds","link":"#good-to-know-keybinds","children":[{"level":3,"title":"Terminal","slug":"terminal","link":"#terminal","children":[]},{"level":3,"title":"(N)Vim","slug":"n-vim","link":"#n-vim","children":[]}]},{"level":2,"title":"Battery Saving","slug":"battery-saving","link":"#battery-saving","children":[{"level":3,"title":"Install auto-cpufreq","slug":"install-auto-cpufreq","link":"#install-auto-cpufreq","children":[]},{"level":3,"title":"Enable Hardware Acceleration (Browser / Video Playback)","slug":"enable-hardware-acceleration-browser-video-playback","link":"#enable-hardware-acceleration-browser-video-playback","children":[]},{"level":3,"title":"Tune your USB peripherals","slug":"tune-your-usb-peripherals","link":"#tune-your-usb-peripherals","children":[]}]},{"level":2,"title":"Kernel flags","slug":"kernel-flags","link":"#kernel-flags","children":[]},{"level":2,"title":"Cassowary (100% Windows App compatibility)","slug":"cassowary-100-windows-app-compatibility","link":"#cassowary-100-windows-app-compatibility","children":[]},{"level":2,"title":"Extras","slug":"extras","link":"#extras","children":[]}],"relativePath":"notes/Linux/linux-setup.md"}'),i={name:"notes/Linux/linux-setup.md"},u=p(`<div class="info custom-block"><p class="custom-block-title">Note</p><p><em>A lot of commands listed here uses xbps (VoidLinux&#39;s package manager) for installation purposes, package names may vary distro to distro.</em></p></div><h2 id="good-to-know-keybinds" tabindex="-1">Good to know Keybinds <a class="header-anchor" href="#good-to-know-keybinds" aria-hidden="true">#</a></h2><h3 id="terminal" tabindex="-1">Terminal <a class="header-anchor" href="#terminal" aria-hidden="true">#</a></h3><div class="language-lua line-numbers-mode"><button class="copy"></button><span class="lang">lua</span><pre><code><span class="line"><span style="color:#A6ACCD;">Ctrl</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">l          clear</span></span>
<span class="line"><span style="color:#A6ACCD;">Alt</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">l           ls</span></span>
<span class="line"><span style="color:#A6ACCD;">Alt</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">s           toggles </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">sudo</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#A6ACCD;">{Ctrl</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">w,Alt</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">d}  {backspace,delete} whole word</span></span>
<span class="line"><span style="color:#A6ACCD;">Ctrl</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">{u,y}      copy</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">paste currently written</span></span>
<span class="line"><span style="color:#A6ACCD;">Alt</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">e           edit currently </span><span style="color:#82AAFF;">written</span><span style="color:#A6ACCD;"> ($EDITOR)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="n-vim" tabindex="-1">(N)Vim <a class="header-anchor" href="#n-vim" aria-hidden="true">#</a></h3><div class="language-lua line-numbers-mode"><button class="copy"></button><span class="lang">lua</span><pre><code><span class="line"><span style="color:#FFCB6B;">Abbreviation</span><span style="color:#A6ACCD;">: </span><span style="color:#C792EA;">&lt;C&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> Ctrl  </span><span style="color:#C792EA;">&lt;A&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> Alt  </span><span style="color:#C792EA;">&lt;S&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> Shift</span></span>
<span class="line"><span style="color:#FFCB6B;">Notation</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">^</span><span style="color:#A6ACCD;">T </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">&lt;C-t&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> Ctrl</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">t</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">                Goto </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">th line</span></span>
<span class="line"><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">|                Goto </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">th character on current line</span></span>
<span class="line"><span style="color:#A6ACCD;">f</span><span style="color:#89DDFF;">+</span><span style="color:#C792EA;">&lt;x&gt;</span><span style="color:#A6ACCD;">             Goto </span><span style="color:#82AAFF;">next</span><span style="color:#A6ACCD;"> occurrence of the character </span><span style="color:#82AAFF;">x</span><span style="color:#A6ACCD;">  (</span><span style="color:#FFCB6B;">previous</span><span style="color:#A6ACCD;">: F)</span></span>
<span class="line"><span style="color:#A6ACCD;">t</span><span style="color:#89DDFF;">+</span><span style="color:#C792EA;">&lt;x&gt;</span><span style="color:#A6ACCD;">             Goto character just before </span><span style="color:#82AAFF;">next</span><span style="color:#A6ACCD;"> occurrence of the character </span><span style="color:#82AAFF;">x</span><span style="color:#A6ACCD;"> (</span><span style="color:#FFCB6B;">previous</span><span style="color:#A6ACCD;">: T)</span></span>
<span class="line"><span style="color:#A6ACCD;">;                 Repeat last f</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">t</span><span style="color:#89DDFF;">-</span><span style="color:#C792EA;">&lt;x&gt;</span><span style="color:#A6ACCD;"> command</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#A6ACCD;">|</span><span style="color:#89DDFF;">&gt;&gt;</span><span style="color:#A6ACCD;">|</span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;">          Tab </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> normal </span><span style="color:#82AAFF;">mode</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> is smart add</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">reducer)</span></span>
<span class="line"><span style="color:#A6ACCD;">gg</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">G              Reindent whole </span><span style="color:#82AAFF;">file</span><span style="color:#A6ACCD;"> (gg &amp; </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">G), similarly ggyG to yank file</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">                 Access any register (+ being system clipboard); </span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">p </span><span style="color:#89DDFF;">and</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">+y being paste and copy respectively</span></span>
<span class="line"><span style="color:#A6ACCD;">viw | diw | yiw   Visual</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">Delete</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">Yank </span><span style="color:#82AAFF;">inside</span><span style="color:#A6ACCD;"> (a) word</span></span>
<span class="line"><span style="color:#A6ACCD;">v|V|</span><span style="color:#C792EA;">&lt;C-v&gt;</span><span style="color:#A6ACCD;">         Visual </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> LineVisual </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> VisualBlock mode</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">|</span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">               Search </span><span style="color:#82AAFF;">next</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">prev occurrence of currently focused word</span></span>
<span class="line"><span style="color:#C792EA;">&lt;C-o&gt;</span><span style="color:#A6ACCD;">|</span><span style="color:#C792EA;">&lt;C-S-i&gt;</span><span style="color:#A6ACCD;">     Next</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">Prev location of jump, </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">find</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">&lt;C-d&gt;</span><span style="color:#A6ACCD;">|</span><span style="color:#C792EA;">&lt;C-u&gt;</span><span style="color:#A6ACCD;">       Next</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">Prev </span><span style="color:#89DDFF;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">not</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">that</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">important</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="battery-saving" tabindex="-1">Battery Saving <a class="header-anchor" href="#battery-saving" aria-hidden="true">#</a></h2><h3 id="install-auto-cpufreq" tabindex="-1">Install auto-cpufreq <a class="header-anchor" href="#install-auto-cpufreq" aria-hidden="true">#</a></h3><blockquote> CPU scaling algorithm built-in are not very efficient, auto-cpufreq is ranked to be the best frequency (GHz) scaler, downscales the CPU quickly depending on the current usage of the CPU. It usually results in approx 25-30% more battery life. </blockquote><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git clone https://github.com/AdnanHodzic/auto-cpufreq.git</span></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> auto-cpufreq </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> sudo ./auto-cpufreq-installer</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>And follow on-screen instructions.</p><p>Optionally you can restrict your CPU to go power-save and turn off turbo by writing the following at <code>/etc/auto-cpufreq.conf</code>:</p><div class="language- line-numbers-mode"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">[charger]</span></span>
<span class="line"><span style="color:#A6ACCD;">governor = performance</span></span>
<span class="line"><span style="color:#A6ACCD;">turbo = auto</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">[battery]</span></span>
<span class="line"><span style="color:#A6ACCD;">governor = powersave</span></span>
<span class="line"><span style="color:#A6ACCD;">turbo = off</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>&amp; restarting the service: <code>sudo sv restart auto-cpufreq</code> after editing the file to make the changes take effect.</p><p><em>Note: On intel CPU, scaling is governed by a kernel option, in order for auto-cpufreq to work properly, you may need to set the kernel flag listed below in <a href="#kernel-flags">Kernel flags</a> section.</em></p><h3 id="enable-hardware-acceleration-browser-video-playback" tabindex="-1">Enable Hardware Acceleration (Browser / Video Playback) <a class="header-anchor" href="#enable-hardware-acceleration-browser-video-playback" aria-hidden="true">#</a></h3><blockquote> Hardware acceleration reduces significant load from the CPU, sometimes making battery life upto more than 100%, while using media. </blockquote><p>CLI flags (e.g. <code>~/.config/brave-flags.conf</code>) should match approximately these:</p><div class="language- line-numbers-mode"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">--force-dark-mode</span></span>
<span class="line"><span style="color:#A6ACCD;">--enable-features=VaapiVideoEncoder,VaapiVideoDecoder,CanvasOopRasterization,TouchpadOverscrollHistoryNavigation,WebUIDarkMode</span></span>
<span class="line"><span style="color:#A6ACCD;">--enable-zero-copy</span></span>
<span class="line"><span style="color:#A6ACCD;">--use-gl=desktop    # =egl on wayland</span></span>
<span class="line"><span style="color:#A6ACCD;">--ignore-gpu-blocklist</span></span>
<span class="line"><span style="color:#A6ACCD;">--enable-oop-rasterization</span></span>
<span class="line"><span style="color:#A6ACCD;">--enable-raw-draw</span></span>
<span class="line"><span style="color:#A6ACCD;">--enable-gpu-compositing</span></span>
<span class="line"><span style="color:#A6ACCD;">--enable-gpu-rasterization</span></span>
<span class="line"><span style="color:#A6ACCD;">--enable-native-gpu-memory-buffers</span></span>
<span class="line"><span style="color:#A6ACCD;">--use-vulkan</span></span>
<span class="line"><span style="color:#A6ACCD;">--disable-features=UseChromeOSDirectVideoDecoder</span></span>
<span class="line"><span style="color:#A6ACCD;">--disable-sync-preferences</span></span>
<span class="line"><span style="color:#A6ACCD;">--force-device-scale-factor=1.5</span></span>
<span class="line"><span style="color:#A6ACCD;">--password-store=basic    # disables kwallet (optional)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>Also, <em>optionally</em> enable these two flags by navigating into these addresses:<br> chrome://flags/#enable-raw-draw<br> chrome://flags/#enable-vp9-kSVC-decode-acceleration</p><p>Now everything should be green in chrome://gpu except for compositor rendering.</p><p>If not, possibly graphic drivers are missing, install appropriately for your GPU <em>(may require a reboot to take effect)</em>:</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#676E95;"># Intel</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo xbps-install mesa-intel-dri mesa-vaapi intel-video-accel</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">[ -f /usr/lib64/dri/iHD_drv_video.so ] &amp;&amp; export LIBVA_DRIVER_NAME=iHD</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.bashrc</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">if [ -f /usr/lib64/dri/iHD_drv_video.so ]; set -x LIBVA_DRIVER_NAME iHD; end</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.config/fish/config.fish</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># AMD</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo xbps-install mesa-ati-dri</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Yet still sometimes video decoding doesn&#39;t work, to check either go to</p><ul><li>Media section in chrome&#39;s inspect panel (F12/Right-Click)</li><li>OR navigate to chrome://media-internals</li></ul><p>while playing a video and see if error is empty, <code>Hardware decoder: true</code> and <code>Decoding name: VDAVideoDecoder</code>.</p><div style="display:flex;flex-direction:row;"><img src="`+r+'" width="55%"><img src="'+t+'" width="45%"></div><p>If not, first try using <a href="https://chrome.google.com/webstore/detail/enhanced-h264ify/omkfmpieigblcllmkgbflkikinpkodlk" target="_blank" rel="noreferrer">enhanced-264ify</a> extension with following blocks:</p><p><img src="'+c+`" alt="enhanced-264ify extension"></p><p>That should make low-resolution videos (&lt;720p) forcefully use h264 which can be hardware-decoded.</p><p>If still not showing hardware decoding, you may need to build <code>intel-media-driver</code> with nonfree kernel-option (Or check if nonfree repository on your distro redistribute this pkg) as pointed out by <a href="https://github.com/saiarcot895/chromium-ubuntu-build/issues/98#issuecomment-757710499" target="_blank" rel="noreferrer">this comment</a>.</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">./xbps-src -o nonfree pkg intel-media-driver</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><h3 id="tune-your-usb-peripherals" tabindex="-1">Tune your USB peripherals <a class="header-anchor" href="#tune-your-usb-peripherals" aria-hidden="true">#</a></h3><blockquote> PowerTop is majorly a power resource monitor, yet it provides a tuning option which can significantly reduce your power consumption, may result in upto 5-10% more battery life. </blockquote><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">sudo xbps-install powertop</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo powertop --autotune   </span><span style="color:#676E95;"># Do everytime laptop boots, or make a startup script</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="kernel-flags" tabindex="-1">Kernel flags <a class="header-anchor" href="#kernel-flags" aria-hidden="true">#</a></h2><p>Set the following parameters (in <code>/etc/default/grub</code>) to ensure:</p><ul><li>Kernel throws good amount of information to debug if sth went wrong.</li><li>Sleep states work perfectly.</li><li>Wireless &amp; Ethernet device names are traditional (wlan0/eth0) rather than some dynamic names (e.g. wlp3s0).</li><li>Panel self refresh is on (Intel).</li><li>Intel&#39;s pstate is turned off, so auto-cpufreq can take over.</li><li>NVME acpi is required on very new SSD to work, but it compromises battery on other laptops, should be turned off if possible by setting noacpi=1.</li></ul><div class="language- line-numbers-mode"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">GRUB_CMDLINE_LINUX_DEFAULT=&quot;loglevel=4 acpi_osi=&#39;Windows 2020&#39; net.ifnames=0 i915.enable_psr=1 intel_pstate=disable nvme.noacpi=1&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>After every edit, you must run <code>sudo update-grub</code> in order for the changes to take effect in next boot.</p><h2 id="cassowary-100-windows-app-compatibility" tabindex="-1">Cassowary (100% Windows App compatibility) <a class="header-anchor" href="#cassowary-100-windows-app-compatibility" aria-hidden="true">#</a></h2><p>Unlike <a href="https://www.winehq.org" target="_blank" rel="noreferrer">Wine</a>, which often breaks itself when you need something like two applications co-working together or when you need to use applications like MS Word or any Heavy video-editor which extensively uses Win32 and Microsoft APIs, The <a href="https://github.com/casualsnek/cassowary" target="_blank" rel="noreferrer">Cassowary</a> will fully support running all of them with native experience.</p><p>Under the hood, it&#39;ll use a Windows VM which can autosuspend itself when not under use to lower the power consumption while giving back 100% application compatibility without any hard to setup path. You can make windows installation as custom as you like, you just need to turn on RDP and install cassowary guest tools for forwarding the application to your linux host and make application shortcuts for directly opening them.</p><p>I&#39;d be using <a href="https://github.com/quickemu-project/quickemu" target="_blank" rel="noreferrer">quickemu</a> for quickly setting up the VM without hassle... Prebuilt void-pkg is <a href="https://github.com/Animeshz/void-xpackages" target="_blank" rel="noreferrer">here</a>. Use gpu passthrough helper for GPU forwarding (optional).</p><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">sudo xbps-install quickemu spice-vdagent</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># Find for your distro here: https://github.com/pavolelsig</span></span>
<span class="line"><span style="color:#A6ACCD;">git clone https://github.com/oSoWoSo/passthrough_helper_void </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> passthrough_helper_void</span></span>
<span class="line"><span style="color:#A6ACCD;">chmod +x </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.sh</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo ./gpu_passthrough.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">quickget windows 10</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">cpu_cores=&quot;4&quot;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;&gt;</span><span style="color:#A6ACCD;"> windows-10.conf  </span><span style="color:#676E95;"># optional</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">port_forwards=(&quot;7220:7220&quot;)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;&gt;</span><span style="color:#A6ACCD;"> windows-10.conf</span></span>
<span class="line"><span style="color:#A6ACCD;">quickemu --vm windows-10.conf --display spice</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># Download &amp; Install for copy paste (in Windows VM)</span></span>
<span class="line"><span style="color:#676E95;"># https://www.spice-space.org/download/windows/spice-guest-tools/spice-guest-tools-latest.exe</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># Enable RDP &amp; Change RDP Port to 7220 (in Windows VM)</span></span>
<span class="line"><span style="color:#676E95;"># Win+I -&gt; System -&gt; Remote Desktop</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">sudo xbps-install freerdp libvirt-python3</span></span>
<span class="line"><span style="color:#A6ACCD;">pip install PyQt5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">wget https://github.com/casualsnek/cassowary/releases/download/0.6/cassowary-0.6-py3-none-any.whl</span></span>
<span class="line"><span style="color:#A6ACCD;">pip install cassowary</span><span style="color:#89DDFF;">*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">python3 -m cassowary -a</span></span>
<span class="line"><span style="color:#676E95;"># Set VM IP as \`127.0.0.1\`, rest from get from rdp settings and \`hostname\` command in cmd/powershell.</span></span>
<span class="line"><span style="color:#676E95;"># Save Settings &amp; Reconnect</span></span>
<span class="line"><span style="color:#676E95;"># Goto: Guest app, and create shortcuts</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h2 id="extras" tabindex="-1">Extras <a class="header-anchor" href="#extras" aria-hidden="true">#</a></h2><ul><li><a href="https://www.reddit.com/r/linux/comments/rmuh0o/finally_macoswindows_like_touchpad_zoom_gesture" target="_blank" rel="noreferrer">Chromium - MacOS like pinch zoom (not scaling like Ctrl+ Ctrl-)</a></li></ul>`,47);function y(s,d,b,A,C,D){return o(),a("div",null,[e("h1",null,l(s.$frontmatter.title),1),u])}const g=n(i,[["render",y]]);export{h as __pageData,g as default};
