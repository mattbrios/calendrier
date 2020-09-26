//Carregamento da classe pra animações
AOS.init({
    duration: 1200,
});

$(function () {
    //Carregamento dos arquivos de menu e footer
    $('#menu').load('menu.html', menuLoad);
    $('#footer').load('footer.html', footerLoad);

    //Direcionamento botão Saiba Mais dos boxes de Funcionalidades na home
    $('.btn-saibamais').click(function() {
        window.location.href = "funcionalidades.html"
    });
    
    //Click na TV destaque pra exibir o vídeo do YouTube em modal
    $('.btn-video').click(function() {
        $('.embed-responsive-item').attr('src', "https://www.youtube.com/embed/ZcxrV1m36IY?autoplay=1");
        $('#video-modal').modal('toggle');
    });

    //Funcão de "matar" o vídeo quando fecha a modal
    $('#video-modal').on('hide.bs.modal', function(e) {
        $('.embed-responsive-item').each(function(){
            $('.embed-responsive-item').attr('src', "");
        });
    });

    //Scroll dos botões de categoria da view de Funcionalidades
    $('.btn-scroll').click( function(e) {
        e.preventDefault();
        scrollTo($(this).attr('destiny'));
    });

    //Efeito onda do destaque no Firefox
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
        $('.header-home').addClass('header-firefox')
    }

    //Delay de animação pra exibição do formulário em testar-agora
    setTimeout(function() {
        $('.vcenter').fadeIn();
    }, 300);

    //Validação e submit do Passo 01 do formulário
    $('.btn-form').click(function() {
        $('.error-msg').remove();
        var validateStep1 = [validateMail(), validatePass()];
        if ( validateStep1.indexOf(false) < 0 ) {
            $('.step1').fadeOut(function() {
                $('.step2').fadeIn(function() {
                    $('#inputName').focus();
                });
                //Add botão de submit do form
                $('.submit-container').append('<button type="submit" class="btn btn-cta form-submit"><i class="fas fa-rocket"></i>Testar agora</button>');
            });
        }
    });

    //Função que simula o type=submit no Passo 1, pressionando Enter pra realizar a validação
    $('.step1').on('keypress',function(e) {
        if(e.which == 13) {
            $('.btn-form').trigger("click");
        }
    });

    //Função de submit do formulário
    $('form').submit(function(e) {
        e.preventDefault();
        $('.error-msg').remove();
        var validateStep2 = [validateName(), validatePhone(), validateActivity(), validatePlan()];

        if(validateStep2.indexOf(false) < 0) {
            $('.vcenter').fadeOut();
        }
    })
});

//Função de scroll animado
function scrollTo(destiny) {
    $('html, body').animate({
        scrollTop: $('#' + destiny).offset().top
    }, 'slow');
}

//Função após o carregamento dinâmico do arquivo menu.html
function menuLoad() {
    $('.menu-phone').attr('href', whatsappButton);

    $('.cliente').click(function() {
        window.open('https://www.calendrier.com.br/app/');
    })
}

//Função após o carregmento dinâmico do arquivo footer.html
function footerLoad() {
    $('.whatsapp-btn').hide();
    $('.whatsapp-btn').click(function(e) {
        window.open(whatsappButton());
    });

    //Animação de entrada do botão flutuante de WhatsApp
    setTimeout(function() {
        $('.whatsapp-btn').fadeIn();
    }, 5000);
}

//Validação de e-mail
function validateMail() {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( regex.test($('#mailInput').val()) ) {
        $('#mailInput').removeClass('error');
        return true;
    } else {
        addError ($('#mailInput'), "Email inválido");
        return false
    }
}

//Validação de senha
function validatePass() {
    var pass = $('#passInput').val();
    var minimoCaracteres = 6;

    if( pass.length < minimoCaracteres || pass == undefined ) {
        addError ($('#passInput'), "Sua senha deve conter pelo menos 6 caracteres")
        return false;
    } else {
        $('#passInput').removeClass('error');
        return true;
    }
}

//Validação de nome
function validateName() {
    var name = $('#inputName').val();
    var minNameLength = 3;

    if ( name.length < minNameLength || name == undefined ) {
        addError( $('#inputName'), "Nome inválido" );
        return false;
    } else {
        $('#inputName').removeClass('error');
        return true;
    }
}

//Validação de telefone
function validatePhone() {
    var inputPhone = $('#inputPhone').val();
    if( inputPhone.length < 14 ) {
        addError( $('#inputPhone'), "Número inválido" );
        return false;
    } else {
        $('#inputPhone').removeClass('error');
        return true;
    }
}

//Validação do combo de ramo de atividade
function validateActivity() {
    var activitySelected = $('#inputActivity option:selected');

    if ( activitySelected.val() < 1 ) {
        addError( $('#inputActivity'), "Selecione um ramo de ativididade");
        return false;
    } else {
        $('#inputActivity').removeClass('error');
        return true;
    }
}

//Validação do combo de escolha de planos
function validatePlan() {
    var planSelected = $('#inputPlan option:selected');

    if ( planSelected.val() < 1 ) {
        addError( $('#inputPlan'), "Selecione um plano. Os 7 primeiros dias são grátis!");
        return false;
    } else {
        $('#inputPlan').removeClass('error');
        return true;
    }
}

//Função de adicionar o estulo e mensagem de erro no campo de formulário
function addError(e, message) {
    $(e).addClass("error");
    $(e).focus();
    $('<p class="error-msg">' + message + "<p>").insertAfter(e);
}

//Validação do dispositivo pra encaminhar a URL do Whatsapp
function whatsappButton() {
    let textoShare = "Olá! Gostaria de mais informações sobre o Calendrier. Poderia me ajudar?";
    let wppURL = "";
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        wppURL = 'whatsapp://send?phone=5511991934003&text=' + encodeURIComponent(textoShare);
    } else {
        wppURL = 'https://web.whatsapp.com/send?phone=5511991934003&text=' + encodeURIComponent(textoShare);
    }
    return wppURL;
}