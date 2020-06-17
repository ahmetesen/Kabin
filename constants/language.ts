import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations={en:{},tr:{}}
i18n.translations.en={
    logo:"Kabin",
    errors_defaultErrorTitle:"An error occured...",
    errors_connectionError_title:"Connection error...",
    errors_connectionError_message:"There could be an error with your internet connection. If you have other problems with Kabin, please contact us on our website",
    buttons_cancel:"Cancel",
    buttons_back:'Go Back',
    buttons_continue:'Continue',
    prelanding_notLoadWarning_title:'Could not Loaded :(',
    prelanding_notLoadWarning_description:'An error occured while Kabin opens. This could be an error with application files. You can try reload or contact us with your info.',
    prelanding_notLoadWarning_firstButton:'Reload',
    prelanding_notLoadWarning_secondButton:'Contact Us',
    prelanding_email_bodypt1:'Hi,\nMy datas not loaded while app opens. My information is below (you can write your os version, phone name, your email, short brief):',
    start_button_primary:"Let's Start",
    buttons_login:"Login",
    buttons_signup:'Sign Up',
    seperator_alreadysigned:"Already signed up?",
    seperator_new_user:'New to Kabin?',
    landing_rotators_first_title:'Find Your Crew',
    landing_rotators_first_description:'Find your friends and chat with them before flight.',
    landing_rotators_second_title:'See Your Destination',
    landing_rotators_second_description:'Find info and read comments for your destination point.',
    landing_rotators_third_title:'Previous Flights',
    landing_rotators_third_description:'See previous flights of you and your friends.',
    name_title:'Hi, could you introduce yourself?',
    name_inputplaceholder:'What is your full name?',
    name_error_message:'You have a name, right?',
    createemail_title_pt1:'Welcome ',
    createemail_title_pt2:',\nWhat\'s your email address?',
    createemail_placeholder:'Please write your work email',
    mail_empty_error_message:'You have an email address, right?',
    mail_clientvalidation_error_message:'You have to fill with a valid work email address',
    mail_servervalidation_error_message:'Due to reliability issues, public email addresses are not permitted for Kabin. Please fill input with work address',
    mail_alreadylogged_error_message:'You are already signed up. You can log in to Kabin with email and password.',
    mail_wrong_error_message:'An error occured. Please check your work email address.',
    mail_privacy_text:'By continuing, you agree to our user agreement',
    mail_privacy_link:'https://kabinapp.firebaseapp.com/gizlilik.html',
    mail_welcome_text:'Welcome on board, Dear,',
    mail_placeholder:'What\'s your work email address?',
    password_title:'you have to set a password.',
    password_placeholder:'Set your password',
    password_subinfo:'After setting your password, we will send you an email with a link. To complete your registration, you must click this link.',
    password_char_error:'Your password must include at least six characters.',
    password_enter_password:'Could you enter your password?',
    password_enter_placeholder:'Enter your password',
    password_forgot_text:'Don\'t you remember?',
    password_remind_link:'Remind my password.',
    password_reset_email:'We sent an email to reset your password. Please set your new password and come again.',
    verification_title:'We sent an email with a link to you, just for verification.',
    verification_seperator_text:'No email received?',
    verification_secondary_button_text:'Send email again',
    verification_back_title:'Are you sure?',
    verification_back_description:'If you go back, you will signed out. But you can log in at any time with your email and password.',
    verification_email_sent:'Verification email sent. Now check your inbox.',
    verification_email_text:'Could you click that link? After that, you will redirected to Kabin Home immediately',
    "auth/invalid-email":"There is an error with your e-mail. Could you check it?",
    "auth/user-disabled":"Your account has been blocked. Could you contact us via our email?",
    "auth/user-not-found":"You must register before log in.",
    "auth/wrong-password":"Your password is incorrect. Could you check your email and password again?",
    "restrictedPassword":"This password is restricted. Could you notify us via our email?",
    "auth/email-already-in-use":"This email is already in use.If you already signed up, please login with your password.",
    "auth/operation-not-allowed":"An error occured. Please check infos you write.",
    "auth/weak-password":"Your password is not strong enugh. Is it your birthday or sth :) Please change your password.",
    "auth/argument-error":"Your email or password seems not valid. If there are not a problem with your info, could you contact us via our email?",
    "auth/too-many-requests":"Our servers are really busy right now. Please try a few seconds later.",
    nameScreen:{
        title:"Merhaba,\nSana nasıl hitap edelim?",
        inputPlaceholder:"Adını ve soyadını yazar mısın?",
        buttons:{
            primary:"Devam",
            secondary:"Giriş Yap"
        },
        seperator:"Zaten üye misin?"
    },
    createEmailScreen:{
        welcome:"Hoş geldin,",
        defaultName:"Misafir",
        firmMailError:"Geçerli bir şirket eposta adresi girmelisin.",
        mailError:"Geçerli bir eposta adresi girmelisin.",
        mailValidationError:"Bir hata oluştu :( Eposta adresinde bir hata olabilir mi?",
        emptyMailError:"Bir epostan olmalı?",
        privacyLink:"https://kabinapp.firebaseapp.com/gizlilik.html",
        inputPlaceholder:"Şirket e-posta adresin nedir?",
        privacyLinkText:"Devam ederek, kullanıcı sözleşmesini kabul etmiş sayılırsın.",
        buttons:{
            primary:"Devam",
            secondary:"Giriş Yap"
        },
        seperator:"Zaten üye misin?"
    }
};



i18n.translations.tr={
    logo:"Kabin",
    errors:{
        defaultErrorTitle:"Bir hata oluştu...",
        connectionError:{
            title:"Bir hata oluştu...",
            message:"İnternet bağlantınla ilgili bir problem olabilir. Eğer uygulamayla ilgili sorun yaşıyorsan bize web sitemizdeki iletişim formundan ulaş."
        }
    },
    buttons:{
        cancel:"İptal"
    },
    prelanding:{
        notLoadWarning:{
            title:'Bilgiler Yuklenemedi',
            description:'Uygulama acilirken bir hata olustu. Bu, uygulama dosyalariyla ilgili bir hata olabilir. Bilgileri yuklemeyi tekrar deneyebilir, ya da hatayi bize bildirebilirsin.',
            firstButton:'Tekrar Dene',
            secondButton:'Bildir'
        },
        email:{
            subject:'Kabin acilirken bir hata olustu...',
            prelanding_email_body:'Son calismayan fonksiyon adi:',

        }
    },
    landing:{
        rotators:[
            {
                title:'Ekibini Bul',
                description:'Uçuş öncesinde arkadaşlarını bul ve onlarla konuş.',
            },
            {
                title: 'Destinasyonunu Gör',
                description:'Destinasyonun hakkında bilgi al, yapılan yorumları gör.',
            },
            {
                title: 'Geçmiş Uçuşlar',
                description:'Hem kendinin, hem arkadaşlarının geçmiş uçuşlarını gör.',
            }
        ],
        buttons:{
            primary:"Hadi Başlayalım",
            secondary:"Giriş Yap"
        },
        seperator:"Zaten üye misin?"
    },
    nameScreen:{
        title:"Merhaba,\nSana nasıl hitap edelim?",
        inputPlaceholder:"Adını ve soyadını yazar mısın?",
        buttons:{
            primary:"Devam",
            secondary:"Giriş Yap"
        },
        seperator:"Zaten üye misin?"
    },
    createEmailScreen:{
        welcome:"Hoş geldin,",
        defaultName:"Misafir",
        firmMailError:"Geçerli bir şirket eposta adresi girmelisin.",
        mailError:"Geçerli bir eposta adresi girmelisin.",
        mailValidationError:"Bir hata oluştu :( Eposta adresinde bir hata olabilir mi?",
        emptyMailError:"Bir epostan olmalı?",
        privacyLink:"https://kabinapp.firebaseapp.com/gizlilik.html",
        inputPlaceholder:"Şirket e-posta adresin nedir?",
        privacyLinkText:"Devam ederek, kullanıcı sözleşmesini kabul etmiş sayılırsın.",
        buttons:{
            primary:"Devam",
            secondary:"Giriş Yap"
        },
        seperator:"Zaten üye misin?"
    }
};

i18n.locale = Localization.locale;

i18n.fallbacks = true;

export {i18n};