import React from 'react';
import {MaterialCommunityIcons,FontAwesome} from '@expo/vector-icons';
const en={
};



const tr={
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
    landing:{
        rotators:[
            {
                title:'Ekibini Bul',
                description:'Uçuş öncesinde arkadaşlarını bul ve onlarla konuş.',
                icon: <MaterialCommunityIcons name="account-search" size={96} color='#FFFFFF' />
            },
            {
                title: 'Destinasyonunu Gör',
                description:'Destinasyonun hakkında bilgi al, yapılan yorumları gör.',
                icon: <FontAwesome name="paper-plane" size={96} color='#FFFFFF' />
            },
            {
                title: 'Geçmiş Uçuşlar',
                description:'Hem kendinin, hem arkadaşlarının geçmiş uçuşlarını gör.',
                icon: <FontAwesome name="history" size={96} color='#FFFFFF' />
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

const texts = tr;

export {texts};