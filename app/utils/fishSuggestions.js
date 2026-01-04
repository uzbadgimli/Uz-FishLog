// Hava durumuna gore balik onerisi - SUPER GENISLETILMIS VERSIYON
// 50+ farkli senaryo - Sicaklik, Ruzgar, Mevsim, Saat kombinasyonlari

export function getFishSuggestion(temp, windSpeed, humidity, pressure) {
  const hour = new Date().getHours()
  const month = new Date().getMonth() // 0-11

  // Mevsim belirleme
  const isWinter = month >= 11 || month <= 2  // Aralik-Subat
  const isSpring = month >= 3 && month <= 5   // Mart-Mayis
  const isSummer = month >= 6 && month <= 8   // Haziran-Agustos
  const isAutumn = month >= 9 && month <= 10  // Eylul-Kasim

  // Saat dilimleri
  const isNight = hour >= 22 || hour <= 5
  const isMorning = hour >= 6 && hour <= 9
  const isMidday = hour >= 10 && hour <= 15
  const isEvening = hour >= 16 && hour <= 21

  // Basinc durumu (varsa)
  const isLowPressure = pressure && pressure < 1010
  const isHighPressure = pressure && pressure > 1020

  // ==================== KIS SEZONU (Aralik-Subat) ====================
  if (isWinter) {
    // Cok soguk (< 5°C)
    if (temp < 5) {
      if (windSpeed < 8) {
        if (isNight) {
          return {
            fish: "Gece + Soguk: Mezgit derin sularda aktif. Levrek kayalik diplerde avlaniyor. Iskorpit dip canlilarini ariyor.",
            bait: "Fosforlu jig head (21-28gr), turuncu/kirmizi silikon, canli kalamar parcasi, gece icin glow shad"
          }
        }
        if (isMorning) {
          return {
            fish: "Sabah + Soguk: Mezgit ve Levrek sabah aktivitesi basliyor. Kalkan kumlu dip alanlarinda. Dip avi icin ideal.",
            bait: "Agir silikon (motor oil rengi), 18-25gr jig head, canli caca, slow pitch jig"
          }
        }
        return {
          fish: "Kis gunu sakin: Mezgit suruseri dipte toplanmis. Levrek yavas hareketli. Kalkan aktif olabilir.",
          bait: "Derin minnow (11-14cm), agir metal jig, canli yem tercih edilmeli"
        }
      }
      if (windSpeed < 15) {
        return {
          fish: "Soguk + Ruzgarli: Levrek kiyiya yaklasti, yem organizmalari kiyi cercevesinde. Mezgit derin sularda bekliyor.",
          bait: "Agir jig head (21-28gr), buyuk silikon balık, derin calisan minnow, canli yem"
        }
      }
      return {
        fish: "Kis firtinasi: Korunakli limanlarda Levrek ve Kefal. Dalgakiranlarin diplerinde Iskorpit.",
        bait: "Agir silikon, canli yem sart, ekmek icli kefal icin, canlı caca"
      }
    }

    // Soguk (5-10°C)
    if (temp >= 5 && temp < 10) {
      if (windSpeed < 10) {
        if (isMorning) {
          return {
            fish: "Kis sabahi ideal: Levrek sabah avinda, Mezgit aktif, Cipura derin sularda. Altin saat!",
            bait: "11-14cm suspending minnow, silikon shad (motor oil), canli cupra, slow jig"
          }
        }
        if (isEvening) {
          return {
            fish: "Kis aksami: Levrek aksam aktivitesinde, Sinarit kayaliklarda, Mercan derin resifler.",
            bait: "Minnow (dogal renkler), orta agirlik jig, canli karides, kalamar parcasi"
          }
        }
        if (isNight) {
          return {
            fish: "Kis gecesi: Levrek gece avi muthis! Mezgit fosforlu yemlere ilgi gosteriyor. Fener isigi etrafi kontrol.",
            bait: "Fosforlu silikon, glow minnow, canli yem, fener/lamba civarini tara"
          }
        }
        return {
          fish: "Kis gunu orta: Levrek ve Mezgit aktif. Cipura derin alanlarda. Sabir gerekli.",
          bait: "Minnow, silikon shad, canli yem kombinasyonu dene"
        }
      }
      if (windSpeed < 20) {
        return {
          fish: "Ruzgarli kis: Levrek kiyilarda cok aktif! Lodos/Poyraz yemi kiyiya surukluyor. Firsati kacirma!",
          bait: "Derin calisan minnow, agir jig head (14-21gr), buyuk silikon balik"
        }
      }
      return {
        fish: "Firtinali kis: Korunakli limanlarda Levrek, Kefal ve Iskorpit. Dalgakiranlar verimli.",
        bait: "Agir silikon, canli yem, ekmek (kefal), dalgakiran dipleri"
      }
    }

    // Ilik kis (10-15°C)
    if (temp >= 10 && temp < 15) {
      if (windSpeed < 12) {
        return {
          fish: "Ilik kis gunu: Levrek, Cipura, Sinarit cok aktif! Lufer arada goruluyor. Kis ortasi surprizi!",
          bait: "11-14cm minnow (dogal renkler), stick bait, popper, canli kolyoz"
        }
      }
      return {
        fish: "Ilik ve ruzgarli kis: Levrek kayaliklarda, Cipura akintili noktalarda, Kefal kiyilarda.",
        bait: "Minnow, silikon, kefal icin ekmek, akintili bolgeleri hedefle"
      }
    }
  }

  // ==================== ILKBAHAR SEZONU (Mart-Mayis) ====================
  if (isSpring) {
    // Serin ilkbahar (8-14°C)
    if (temp < 14) {
      if (windSpeed < 10) {
        if (isMorning) {
          return {
            fish: "Ilkbahar sabahi: Levrek uyanis doneminde, Cipura sicak su ariyor, Lufer kiyilara yaklasti!",
            bait: "Minnow (parlak renkler), silikon shad, popper, canli caca"
          }
        }
        if (isEvening) {
          return {
            fish: "Ilkbahar aksami: Levrek aksam avinda aktif, Lufer suru halinde, Sinarit kayaliklarda.",
            bait: "Stick bait, popper, metal jig 20-30gr, canli kolyoz"
          }
        }
        return {
          fish: "Ilkbahar ortasi: Levrek, Cipura aktif. Lufer gorulmeye basliyor. Sezon aciliyor!",
          bait: "Minnow, silikon, popper dene, canli yem her zaman ise yarar"
        }
      }
      if (windSpeed < 18) {
        return {
          fish: "Ruzgarli ilkbahar: Levrek ve Lufer kiyilarda cok aktif! Ruzgar yemi getiriyor.",
          bait: "Agir minnow, metal jig, buyuk silikon, yuzey yemleri dene"
        }
      }
      return {
        fish: "Firtinali ilkbahar: Korunakli alanlarda Levrek, Kefal. Firtina sonrasi altin!",
        bait: "Agir jig, canli yem, firtina sonrasini bekle"
      }
    }

    // Ideal ilkbahar (14-20°C)
    if (temp >= 14 && temp < 20) {
      if (windSpeed < 10) {
        if (isMorning) {
          return {
            fish: "ALTIN SABAH! Levrek, Cipura, Lufer, Palamut hepsi aktif! Sezonun en iyi zamani!",
            bait: "Her tur yem calisir: minnow, popper, jig, canli yem. Aksiyon garantili!"
          }
        }
        if (isEvening) {
          return {
            fish: "ALTIN AKSAM! Lufer suru halinde saldiriyor, Levrek kayaliklarda, Palamut yuzey de!",
            bait: "Popper, stick bait, metal jig, sabiki takimi, canli kolyoz"
          }
        }
        if (isNight) {
          return {
            fish: "Ilkbahar gecesi: Levrek gece avi muhtesem, Kalamar sezonu acildi, Barbun aktif.",
            bait: "Fosforlu minnow, kalamar yemi (egi), canli karides, gece jig"
          }
        }
        return {
          fish: "Mukemmel ilkbahar: TUM BALIKLAR AKTIF! Levrek, Cipura, Lufer, Sinarit, Mercan...",
          bait: "Minnow, popper, jig, canli yem - hepsini dene!"
        }
      }
      if (windSpeed < 20) {
        return {
          fish: "Ruzgarli ama verimli: Lufer deli gibi! Levrek sahile yanasti. Palamut suru halinde.",
          bait: "Metal jig 30-50gr, buyuk popper, trolling lure, sabiki"
        }
      }
      return {
        fish: "Sert ruzgar: Lufer ve Palamut icin harika! Kiyida Levrek cok aktif!",
        bait: "Agir metal jig, buyuk silikon, derin minnow"
      }
    }

    // Sicak ilkbahar sonu (20-25°C)
    if (temp >= 20) {
      if (windSpeed < 12) {
        return {
          fish: "Yaz oncesi: Cipura, Istavrit, Kolyoz aktif. Lufer gece daha iyi. Mercan derinlerde.",
          bait: "Kucuk minnow (7-9cm), micro jig, sabiki, canli karides"
        }
      }
      return {
        fish: "Sicak ve ruzgarli: Yuzey baliklari (Lufer, Istavrit, Kolyoz) aktif. Sabah/aksam avla.",
        bait: "Popper, kucuk metal jig, sabiki takimi, stick bait"
      }
    }
  }

  // ==================== YAZ SEZONU (Haziran-Agustos) ====================
  if (isSummer) {
    // Ilik yaz (18-24°C)
    if (temp < 24) {
      if (windSpeed < 10) {
        if (isNight) {
          return {
            fish: "Yaz gecesi altin: Levrek gece aktif, Kalamar avciligi ideal, Mercan ve Fangri dipte.",
            bait: "Fosforlu silikon, kalamar yemi (egi), gece minnow, canli karides"
          }
        }
        if (isMorning) {
          return {
            fish: "Erken yaz sabahi: Gun dogumunda Levrek, Cipura sicak sevmiyor - erken avla!",
            bait: "Minnow, silikon, popper - gunes yukselmeden bitir"
          }
        }
        if (isEvening) {
          return {
            fish: "Yaz aksami: Sicak dususu ile Levrek, Lufer, Istavrit aktiflesir. Aksam avla!",
            bait: "Popper, stick bait, minnow, canli yem"
          }
        }
        return {
          fish: "Sicak ogle: Baliklar derin ve serin sulara cekiliyor. Oglen avi zor.",
          bait: "Derin jig, canli yem, golge alanlari hedefle"
        }
      }
      return {
        fish: "Ruzgarli yaz: Istavrit, Kolyoz, Lufer yuzey de! Meltem zamanı!",
        bait: "Sabiki, popper, metal jig, canli ciroz"
      }
    }

    // Sicak yaz (24-30°C)
    if (temp >= 24 && temp < 30) {
      if (windSpeed < 8) {
        if (isNight) {
          return {
            fish: "Sicak yaz gecesi: GECE AVI SART! Levrek, Kalamar, Barbun, Mercan gece aktif.",
            bait: "Fosforlu her tur yem, kalamar egi, canli karides, gece jig"
          }
        }
        if (isMorning) {
          return {
            fish: "Sicak sabah: Sadece gunes dogmadan 1-2 saat! Sonra baliklar deriner gider.",
            bait: "Hizli avla - minnow, popper, canli yem"
          }
        }
        return {
          fish: "Cok sicak gun: Oglen avi cok zor. Gece veya cok erken sabah tek sans.",
          bait: "Derin su yemleri, canli yem, gece avini planla"
        }
      }
      return {
        fish: "Sicak ama ruzgarli: Istavrit, Kolyoz surusteri yuzey de. Aksam Lufer cikabilir.",
        bait: "Sabiki, micro jig, popper, aksam cikisi bekle"
      }
    }

    // Cok sicak (> 30°C)
    if (temp >= 30) {
      if (isNight) {
        return {
          fish: "Kavurucu gece: Gece avi tek secenek! Levrek, Kalamar, dip baliklari aktif.",
          bait: "Tamamen fosforlu donanim, kalamar egi, canli yem"
        }
      }
      return {
        fish: "Asiri sicak: Balik avlamak cok zor. Gece avini tercih et veya cok derin sulara git.",
        bait: "Derin su jig, canli yem, gece bekle"
      }
    }
  }

  // ==================== SONBAHAR SEZONU (Eylul-Kasim) ====================
  if (isAutumn) {
    // Erken sonbahar (18-24°C)
    if (temp >= 18 && temp < 24) {
      if (windSpeed < 12) {
        if (isMorning) {
          return {
            fish: "Sonbahar sabahi altin: Lufer cosku halinde! Palamut surusteri! Levrek kayaliklarda!",
            bait: "Metal jig, popper, minnow, sabiki - her sey calisir!"
          }
        }
        if (isEvening) {
          return {
            fish: "Sonbahar aksami muhtesem: Lufer saldiri modunda, Palamut trolling icin ideal, Levrek aktif!",
            bait: "Popper, stick bait, trolling lure, metal jig 30-50gr"
          }
        }
        return {
          fish: "SONBAHAR SEZONU! Lufer, Palamut, Levrek, Cipura - yilin en verimli zamani!",
          bait: "Her tur sahte yem, canli kolyoz, sabiki, trolling lure"
        }
      }
      return {
        fish: "Ruzgarli sonbahar: Lufer ve Palamut deli gibi! Sahilde Levrek cildirmis durumda!",
        bait: "Agir jig, buyuk popper, trolling, buyuk minnow"
      }
    }

    // Serin sonbahar (12-18°C)
    if (temp >= 12 && temp < 18) {
      if (windSpeed < 15) {
        if (isMorning) {
          return {
            fish: "Serin sonbahar sabahi: Levrek, Cipura ana aktivite saati. Lufer hala var. Mezgit geliyor!",
            bait: "Minnow (11-14cm), silikon shad, canli caca, jig"
          }
        }
        if (isEvening) {
          return {
            fish: "Sonbahar aksami: Levrek aksam cikisi muthis, Lufer son saldirilar, Sinarit kayaliklarda.",
            bait: "Stick bait, popper, minnow, canli kolyoz"
          }
        }
        return {
          fish: "Serin sonbahar gunu: Levrek ve Cipura cok aktif. Lufer azaliyor. Mezgit artıyor.",
          bait: "Minnow, silikon, canli yem - klasik donanim"
        }
      }
      return {
        fish: "Ruzgarli sonbahar: Levrek sahile yapisti! Kipurdayan her seye saldirir!",
        bait: "Buyuk silikon, agir minnow, canli yem"
      }
    }

    // Soguk sonbahar (< 12°C)
    if (temp < 12) {
      if (windSpeed < 10) {
        return {
          fish: "Gec sonbahar: Mezgit sezonu acildi! Levrek derin sulara cekiliyor. Kalkan aktif.",
          bait: "Agir jig, derin minnow, canli yem, slow pitch jig"
        }
      }
      return {
        fish: "Soguk ve ruzgarli sonbahar: Mezgit ve Levrek icin iyi! Kis hazirligi basladi.",
        bait: "Agir silikon, jig head 18-25gr, canli caca"
      }
    }
  }

  // ==================== GENEL / VARSAYILAN ====================
  // Basinc bazli ek oneriler
  if (isLowPressure) {
    return {
      fish: "Dusuk basinc: Baliklar aktif! Firtina oncesi avlanma icguduleri tetiklendi. Firsati kacirma!",
      bait: "Agresif yemler - popper, jerkbait, buyuk silikon, hizli retrieve"
    }
  }

  if (isHighPressure) {
    return {
      fish: "Yuksek basinc: Baliklar durgun olabilir. Sabir gerekli. Yavas ve dikkatli avla.",
      bait: "Finesse teknikleri - kucuk silikon, yavas minnow, canli yem tercih"
    }
  }

  // Saat bazli varsayilan
  if (isMorning) {
    return {
      fish: "Sabah saatleri: Levrek, Cipura, Lufer aktif olmasi beklenir. Altin saat dilimi!",
      bait: "Minnow, silikon, popper - klasik sabah donanimı"
    }
  }

  if (isEvening) {
    return {
      fish: "Aksam saatleri: Baliklar aksam yemegine cikiyor. Levrek, Lufer, Istavrit aktif.",
      bait: "Popper, stick bait, minnow - aksam cikisi icin ideal"
    }
  }

  if (isNight) {
    return {
      fish: "Gece avı: Levrek, Kalamar, Barbun gece aktif. Fener isiklari civarini kontrol et.",
      bait: "Fosforlu yemler, kalamar egi, canli karides"
    }
  }

  // En genel varsayilan
  return {
    fish: "Genel durum: Levrek, Cipura, Lufer, Istavrit aktif olabilir. Kosullara gore avla.",
    bait: "11-14cm minnow, silikon balik, popper, metal jig - cesitlilik onemli"
  }
}

// Ay fazina gore balik tavsiyesi - GENISLETILMIS
export function getMoonFishSuggestion(phase) {
  const hour = new Date().getHours()
  const isNight = hour >= 20 || hour <= 6

  const suggestions = {
    0: { // Yeni Ay
      title: "Yeni Ay - EN IYI DONEM!",
      fish: isNight
        ? "GECE AVI ALTIN! Levrek, Cipura, Lufer karanlikta avlaniyor. Kalamar cok aktif!"
        : "Yeni ay gunduz: Levrek, Cipura derin sularda. Aksami ve geceyi bekle!",
      tip: isNight
        ? "Tam karanlik - baliklar guvende hissedip yuzey e cikiyor. Fosforlu yemler sart!"
        : "Gunduz aktivite dusuk. Gece avini planla. Sabah cok erken veya aksam avla.",
      bait: "Fosforlu silikon, glow minnow, canli yem, kalamar egi"
    },
    1: { // Hilal (buyuyen)
      title: "Buyuyen Hilal - Iyi Donem",
      fish: isNight
        ? "Gece aktivitesi yuksek: Levrek, Mezgit, Cipura aktif. Az isik avantaj!"
        : "Gunduz: Gun dogumu ve batimi en verimli. Levrek kayaliklarda.",
      tip: "Ay isigi az - baliklar hala gece avantajli. Sabah ve aksam da iyi.",
      bait: "Dogal renkli minnow, silikon shad, canli caca, orta agirlik jig"
    },
    2: { // Ilk Dordun
      title: "Ilk Dordun - Orta Aktivite",
      fish: "Cipura, Istavrit, Barbun orta aktivitede. Levrek secici besleniyor.",
      tip: "Sabah erken saatler daha verimli. Aksam aktivite dusebilir. Sabir gerekli.",
      bait: "Kucuk minnow, sabiki, canli karides, dogal renkler tercih"
    },
    3: { // Siskin (dolunaya gidis)
      title: "Dolunaya Gidis - Artan Aktivite",
      fish: "Levrek, Lufer, Kolyoz aktiflesmeye basladi! Dolunay hazirligi.",
      tip: "Her gecen gun daha iyi! Aksam saatleri giderek verimli. Gece avina hazirlan.",
      bait: "Popper, stick bait, metal jig, parlak renkler etkili"
    },
    4: { // Dolunay
      title: "DOLUNAY - ZIRVE AKTIVITE!",
      fish: isNight
        ? "GECE AVI MUHTESEM! Ay isiginda TUM BALIKLAR yuzey de! Suruler gorulur!"
        : "Dolunay gunduz: Aktivite hala yuksek. Tum gun avlanabilir!",
      tip: isNight
        ? "Ay isigi denizi aydinlatiyor - baliklar rahat avlaniyor. Gumus/beyaz yemler!"
        : "Dolunay etkisi gunduz de devam eder. Aksam ve gece daha da iyi!",
      bait: "Yuzey yemler, popper, gumus/beyaz minnow, parlak jig, canli yem"
    },
    5: { // Siskin (azalan)
      title: "Dolunay Sonrasi - Hala Cok Iyi",
      fish: isNight
        ? "Gece hala verimli: Levrek, Cipura, Palamut aktif. Ay isigi azaliyor."
        : "Gunduz iyi: Sabah ozellikle verimli. Aktivite devam ediyor.",
      tip: "Dolunay etkisi 2-3 gun devam eder. Gece avi hala tavsiye edilir.",
      bait: "Minnow, silikon, trolling lure, canli kolyoz"
    },
    6: { // Son Dordun
      title: "Son Dordun - Azalan Aktivite",
      fish: "Mezgit, Barbun, Iskorpit (dip baliklari) one cikiyor. Yuzey aktivitesi dusuk.",
      tip: "Dip avi daha verimli. Sabah erken saatler. Derin sulari hedefle.",
      bait: "Agir jig, canli yem, kalamar parcasi, dip donanimlari"
    },
    7: { // Hilal (azalan)
      title: "Azalan Hilal - Yeni Ay Hazirligi",
      fish: isNight
        ? "Karanlik artiyor: Levrek, Mezgit gece aktiflesmeye basliyor!"
        : "Gunduz durgun: Aktivite dusuk. Yeni Ay'i bekle veya gece avla.",
      tip: "Aktivite artmaya basliyor. Gece avina hazirlan! Yeni Ay yaklasıyor.",
      bait: "Fosforlu yemler, derin minnow, silikon, gece donanimlari"
    }
  }
  return suggestions[phase] || suggestions[0]
}
