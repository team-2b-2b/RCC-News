var a = [];

  for(let i=0 ; i<20 ; i++){
    $(`#${i}`).on('click', function(){
        event.preventDefault();
      $(`#${i}W`).css("background-color", "red");
      var txtbox = document.getElementById(`comment${i}`);  
      var txt = txtbox.value;
      $( `#${i}W` ).append( `<li class="${i}l"> ${txt}</li>`);
      $( txtbox ).val('');  
    })
  }

  $('.hidden').hide();