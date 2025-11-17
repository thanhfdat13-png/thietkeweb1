let index = 0;

const bgs = [
  'url("aquarium/OIP.webp")',
  'url("aquarium/lo.jpg.webp")'
];

function changeBG() {
  index = (index + 1) % bgs.length;
  document.getElementById("aq").style.background =
    `${bgs[index]} center/cover no-repeat`;
}
