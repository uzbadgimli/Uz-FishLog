// Hava durumuna göre balık önerisi - Genişletilmiş versiyon
export function getFishSuggestion(temp, windSpeed) {
  // Çok soğuk hava (< 5°C)
  if (temp < 5) {
    if (windSpeed < 10) {
      return {
        fish: "Mezgit, Levrek (derin su), Kalkan aktif. Dip avı zamanı.",
        bait: "Ağır silikon (turuncu/kırmızı), 18-25gr jig head, canlı çaça, derin minnow"
      }
    }
    return {
      fish: "Zorlu koşullar. Mezgit ve İskorpit dipte bekliyor.",
      bait: "Fosforlu silikon, ağır metal jig, canlı yem (kalamar parçası)"
    }
  }

  // Soğuk hava (5-10°C)
  if (temp >= 5 && temp < 10) {
    if (windSpeed < 8) {
      return {
        fish: "Levrek, Mezgit, Çipura aktif. Sabah ve akşam üstü ideal.",
        bait: "11-14cm suspending minnow, silikon shad (motor oil), canlı çupra"
      }
    }
    if (windSpeed < 15) {
      return {
        fish: "Levrek kıyılarda aktif! Lodos/Poyraz yemi kıyıya sürüklüyor.",
        bait: "Derin çalışan minnow, ağır jig head (14-21gr), silikon balık"
      }
    }
    return {
      fish: "Fırtınalı. Korunaklı limanlarda Levrek ve Kefal.",
      bait: "Ağır silikon, canlı yem, ekmek (kefal için)"
    }
  }

  // Ilık hava (10-15°C) - İdeal sezon!
  if (temp >= 10 && temp < 15) {
    if (windSpeed < 10) {
      return {
        fish: "ALTIN SEZON! Levrek, Çupra, Lüfer, Sinarit çok aktif.",
        bait: "11-14cm minnow (doğal renkler), stick bait, popper, canlı kolyoz"
      }
    }
    if (windSpeed < 20) {
      return {
        fish: "Levrek kayalıklarda, Lüfer yüzeyde sürü halinde, Palamut açıkta.",
        bait: "Metal jig 20-40gr, popper, silikon shad, trolling için büyük minnow"
      }
    }
    return {
      fish: "Rüzgarlı ama verimli. Levrek sahile yanaşıyor, Lüfer aktif.",
      bait: "Ağır metal jig, büyük silikon, derin minnow"
    }
  }

  // Ilık-sıcak (15-20°C)
  if (temp >= 15 && temp < 20) {
    if (windSpeed < 10) {
      return {
        fish: "Çupra, Levrek, Lüfer, Mercan, Fangri aktif. Gün batımı mükemmel!",
        bait: "9-11cm minnow, popper, canlı karides, kalamar parçası"
      }
    }
    if (windSpeed < 18) {
      return {
        fish: "Lüfer ve İstavrit yüzeyde çılgın! Palamut trolling için ideal.",
        bait: "Popper, stick bait, sabiki, metal pilker 30-50gr"
      }
    }
    return {
      fish: "Dalgalı deniz. Kıyıda Levrek, açıkta Palamut.",
      bait: "Ağır jig, büyük popper, trolling lure"
    }
  }

  // Sıcak hava (20-25°C)
  if (temp >= 20 && temp < 25) {
    if (windSpeed < 10) {
      return {
        fish: "Çupra, İstavrit, Kolyoz, Sardalya aktif. Erken sabah veya gece avı.",
        bait: "Küçük minnow (7-9cm), micro jig, sabiki, canlı karides"
      }
    }
    return {
      fish: "Sıcak ve rüzgarlı. Yüzey balıkları (Lüfer, İstavrit, Kolyoz) aktif.",
      bait: "Popper, küçük metal jig, sabiki takımı, stick bait"
    }
  }

  // Çok sıcak (> 25°C)
  if (temp >= 25) {
    if (windSpeed < 8) {
      return {
        fish: "Çok sıcak! Gece avı veya derin su. Barbun, Mercan, Fangri dipte.",
        bait: "Canlı yem (karides, kalamar), derin jig, gece için fosforlu"
      }
    }
    return {
      fish: "Sıcak ama rüzgarlı. Akşam saatlerinde İstavrit, Kolyoz aktif.",
      bait: "Sabiki, micro jig, küçük popper"
    }
  }

  return {
    fish: "Levrek, Çupra, Lüfer, İstavrit aktif olabilir.",
    bait: "11-14cm minnow, silikon balık, popper, metal jig"
  }
}

// Ay fazına göre balık tavsiyesi
export function getMoonFishSuggestion(phase) {
  const suggestions = {
    0: { // Yeni Ay
      title: "Yeni Ay - En İyi Dönem!",
      fish: "Levrek, Çupra, Lüfer, Palamut çok aktif",
      tip: "Gece avı mükemmel. Balıklar karanlıkta avlanmak için yüzeye çıkar.",
      bait: "Fosforlu silikon, glow minnow, canlı yem"
    },
    1: { // Hilal (büyüyen)
      title: "Büyüyen Hilal - İyi Dönem",
      fish: "Levrek, Mezgit, Çipura aktif",
      tip: "Gün doğumu ve batımı en verimli saatler.",
      bait: "Doğal renkli minnow, silikon shad, canlı çaça"
    },
    2: { // İlk Dördün
      title: "İlk Dördün - Orta Aktivite",
      fish: "Çupra, İstavrit, Barbun",
      tip: "Sabah erken saatler daha verimli. Akşam aktivite düşer.",
      bait: "Küçük minnow, sabiki, canlı karides"
    },
    3: { // Şişkin (dolunaya gidiş)
      title: "Dolunaya Gidiş - Artan Aktivite",
      fish: "Levrek, Lüfer, Kolyoz aktifleşiyor",
      tip: "Akşam saatleri giderek daha verimli.",
      bait: "Popper, stick bait, metal jig"
    },
    4: { // Dolunay
      title: "Dolunay - Zirve Aktivite!",
      fish: "TÜM BALIKLAR ÇOK AKTİF!",
      tip: "Gece avı altın! Ay ışığında yüzey avı mükemmel. Sürüler yüzeyde.",
      bait: "Yüzey yemler, popper, gümüş/beyaz minnow, canlı yem"
    },
    5: { // Şişkin (azalan)
      title: "Dolunay Sonrası - Hala İyi",
      fish: "Levrek, Çupra, Palamut aktif",
      tip: "Gece avı hala verimli. Sabah da iyi sonuç verir.",
      bait: "Minnow, silikon, trolling lure"
    },
    6: { // Son Dördün
      title: "Son Dördün - Azalan Aktivite",
      fish: "Mezgit, Barbun, İskorpit (dip balıkları)",
      tip: "Dip avı daha verimli. Sabah erken saatler.",
      bait: "Ağır jig, canlı yem, kalamar parçası"
    },
    7: { // Hilal (azalan)
      title: "Azalan Hilal - Yeni Ay'a Hazırlık",
      fish: "Levrek, Mezgit aktifleşmeye başlıyor",
      tip: "Aktivite artmaya başlıyor. Gece avına hazırlan!",
      bait: "Fosforlu yemler, derin minnow, silikon"
    }
  }
  return suggestions[phase] || suggestions[0]
}
