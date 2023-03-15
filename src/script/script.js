const but_menu1 = document.getElementById('menu_1');
const but_menu2 = document.getElementById('menu_2');
const but_menu3 = document.getElementById('menu_3');

function change(num) {
  let x = document.getElementsByClassName('page_active');
  for (let i = 0; i < x.length; i++) {
    x[i].classList.replace('page_active','page_');
  }
  document.getElementById(num).classList.remove('page_');
  document.getElementById(num).classList.add('page_active');
}

but_menu1.addEventListener('click', function() {change('1')});
but_menu2.addEventListener('click', function() {change('2')});
but_menu3.addEventListener('click', function() {change('3')});


