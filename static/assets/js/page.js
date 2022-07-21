let section_nav = document.getElementById("section-nav");
let action_nav = document.getElementById("action-nav");
let trigger = document.getElementById("menu-toggle");

let action_prev_page = document.getElementById("action-prev-page");
let action_next_page = document.getElementById("action-next-page");
let action_scroll_top = document.getElementById("action-scroll-top");
let action_theme_switch = document.getElementById("action-theme-switch");
let action_share_toggle = document.getElementById("action-share-toggle");

let action_text = document.getElementById("action-text");
let share_icons = document.getElementById("share-icons");
let main = document.getElementById("main");


// Ref: https://stackoverflow.com/a/55686711/11377112
function scroll_to_and(offset, callback) {
    const onScroll = () => {
        if (window.pageYOffset === offset) {
            window.removeEventListener('scroll', onScroll)
            callback()
        }
    }

    window.addEventListener('scroll', onScroll)
    onScroll()
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    })
}

function resize_section_nav(event) {
    if (section_nav.classList.contains("translate-x-full")) return;

    let top = document.documentElement.scrollTop;
    this.delta = top ? (main.offsetLeft + main.offsetWidth) - section_nav.parentElement.getBoundingClientRect().left : 0;

    if (this.delta || event.target === section_nav) {
        section_nav.style.setProperty("--tw-translate-x", this.delta + "px");
    } else {
        section_nav.style.removeProperty("--tw-translate-x");
    }
    section_nav.style.transform = "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))";
}

function theme_toggle(event) {
    if (document.documentElement.classList.toggle('dark')) {
        localStorage.theme = 'dark';
        action_theme_switch.firstElementChild.classList.remove('fa-moon');
        action_theme_switch.firstElementChild.classList.add('fa-sun');
    } else {
        localStorage.theme = 'light';
        action_theme_switch.firstElementChild.classList.remove('fa-sun');
        action_theme_switch.firstElementChild.classList.add('fa-moon');
    }
}


if (localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    action_theme_switch.firstElementChild.classList.remove('fa-moon');
    action_theme_switch.firstElementChild.classList.add('fa-sun');
}

trigger.addEventListener('click', e => {
    action_nav.classList.toggle("translate-y-[-300%]");

    if (section_nav.classList.toggle("translate-x-full")) section_nav.style.removeProperty("--tw-translate-x");
    else resize_section_nav();
});

window.addEventListener('load', resize_section_nav);
document.addEventListener('wheel', resize_section_nav);
document.addEventListener('resize', resize_section_nav);
section_nav.addEventListener('mouseout', resize_section_nav);
section_nav.addEventListener('mouseover', e => section_nav.style.removeProperty("--tw-translate-x"));

action_prev_page?.addEventListener('mouseover', e => action_text.innerText = "Previous post");
action_next_page?.addEventListener('mouseover', e => action_text.innerText = "Next post");
action_scroll_top.addEventListener('mouseover', e => action_text.innerText = "Back to top");
action_theme_switch.addEventListener('mouseover', e => action_text.innerText = "Toggle dark theme");
action_share_toggle.addEventListener('mouseover', e => action_text.innerText = "Share post");

action_prev_page?.addEventListener('mouseout', e => action_text.innerText = "");
action_next_page?.addEventListener('mouseout', e => action_text.innerText = "");
action_scroll_top.addEventListener('mouseout', e => action_text.innerText = "");
action_theme_switch.addEventListener('mouseout', e => action_text.innerText = "");
action_share_toggle.addEventListener('mouseout', e => action_text.innerText = "");

action_scroll_top.addEventListener('click', e => {
    e.preventDefault();
    scroll_to_and(0, () => section_nav.style.removeProperty("--tw-translate-x"));
});

action_theme_switch.addEventListener('click', e => {
    e.preventDefault();
    theme_toggle();
});

action_share_toggle.addEventListener('click', e => {
    e.preventDefault();
    share_icons.classList.toggle("translate-y-[]");
});
