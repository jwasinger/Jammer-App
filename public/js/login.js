$(function () {
  $("form.form-signin").submit(function(e) {
      e.preventDefault();

      if($(this).find('input[name=username]').val() == "" ||
        $(this).find('input[name=password]').val() == "")
      {
        alert('please enter both username and password');
      }
      else
      {
        json_data = {
          username: $(this).find("input[type=email]").val(),
          password: $(this).find("input[type=password]").val()
        };

        $.post('/login', json_data, function(data)
        {
          if(data.success == false)
          {
            switch(data.error)
            {
              case 'auth':
                alert('user doesn\'t exist');
                break;
              case 'no_user_pw':
                alert('missing username/password');
              default:
                alert('unknown login error: '+error);
                break;
            }
          }
          else
          {
            window.location = '/';
          }
        }).fail(function()
        {
          alert('user login post failed (this is likely an issue on the backend)');
        });
      }

      //clear form fields
      $(this).find('input[name=username]').val('');
      $(this).find('input[name=password]').val('');
  });
});
