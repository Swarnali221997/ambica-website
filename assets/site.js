(function(){
  var b=document.querySelector('.burger'),n=document.querySelector('nav.main');
  if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.classList.toggle('open',o);b.setAttribute('aria-expanded',o)})}

  // scroll reveal
  var rv=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    rv.forEach(function(el){io.observe(el)});
  } else rv.forEach(function(el){el.classList.add('in')});

  // generic chip filter: [data-filter] buttons control [data-cat] items inside [data-scope]
  document.querySelectorAll('[data-filters]').forEach(function(bar){
    var scope=document.querySelector(bar.getAttribute('data-filters')),out=document.querySelector('[data-count]');
    bar.addEventListener('click',function(e){
      var c=e.target.closest('.chip'); if(!c) return;
      bar.querySelectorAll('.chip').forEach(function(x){x.classList.remove('on')}); c.classList.add('on');
      var f=c.getAttribute('data-filter'),k=0;
      scope.querySelectorAll('[data-cat]').forEach(function(it){
        var show=f==='all'||it.getAttribute('data-cat').split(' ').indexOf(f)>-1;
        it.classList.toggle('hide',!show); if(show)k++;
      });
      if(out) out.textContent=k+' items';
    });
  });

  // lightbox
  var lb=document.querySelector('.lb');
  if(lb){
    var im=lb.querySelector('img'),cp=lb.querySelector('p');
    document.addEventListener('click',function(e){
      var f=e.target.closest('[data-zoom]');
      if(f){im.src=f.getAttribute('data-zoom');im.alt=f.getAttribute('data-title')||'';cp.textContent=f.getAttribute('data-title')||'';lb.classList.add('open')}
      else if(e.target===lb||e.target.closest('.lb button')){lb.classList.remove('open')}
    });
    document.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('open')});
  }

  // enquiry form: prefill product from ?product=, basic validation
  var f=document.querySelector('form.enq');
  if(f){
    var p=new URLSearchParams(location.search).get('product'),m=f.querySelector('[name=message]');
    if(p&&m&&!m.value){m.value='Please share price and availability for: '+p+'\nQuantity required: '}
    f.addEventListener('submit',function(e){
      var ph=f.querySelector('[name=phone]').value.replace(/\D/g,'');
      if(ph.length<10){e.preventDefault();alert('Please enter a valid phone number.');}
    });
  }
})();
