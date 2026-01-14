// Popüler balıklar (her zaman üstte gösterilecek)
export const popularFish = {
  tr: ['Levrek', 'Lüfer', 'Çipura', 'Mırmır', 'İstavrit'],
  en: ['Sea Bass', 'Bluefish', 'Sea Bream', 'Striped Bream', 'Horse Mackerel']
}

// Tüm balık türleri (alfabetik sıralı)
export const allFish = {
  tr: [
    'Barbun',
    'Çinekop',
    'Dil Balığı',
    'Fangri',
    'Gelincik',
    'Hamsi',
    'Iskorpit',
    'İzmarit',
    'Kalkan',
    'Karagöz',
    'Kefal',
    'Kılıç Balığı',
    'Kolyoz',
    'Kupes',
    'Lahos',
    'Levrek',
    'Lüfer',
    'Mercan',
    'Mersin Balığı',
    'Mezgit',
    'Minekop',
    'Mırmır',
    'Orfoz',
    'Palamut',
    'Pisi',
    'Sardalya',
    'Sarıağız',
    'Sarıkanat',
    'Sinarit',
    'Tekir',
    'Turna',
    'Uskumru',
    'Çipura',
    'İstavrit'
  ].sort((a, b) => a.localeCompare(b, 'tr')),
  en: [
    'Anchovy',
    'Atlantic Bonito',
    'Bluefish',
    'Bogue',
    'Common Pandora',
    'Comber',
    'Dentex',
    'Dusky Grouper',
    'Flounder',
    'Gilthead Sea Bream',
    'Grey Mullet',
    'Hake',
    'Horse Mackerel',
    'John Dory',
    'Mackerel',
    'Meagre',
    'Red Mullet',
    'Red Porgy',
    'Saddled Bream',
    'Sardine',
    'Scorpionfish',
    'Sea Bass',
    'Sea Bream',
    'Shi Drum',
    'Sole',
    'Striped Bream',
    'Swordfish',
    'Turbot',
    'Two-banded Bream',
    'Whiting',
    'White Grouper',
    'Yellowmouth Barracuda'
  ].sort((a, b) => a.localeCompare(b, 'en'))
}

// Dropdown için birleştirilmiş liste (popüler + alfabetik + diğer)
export function getFishList(language) {
  const popular = popularFish[language] || popularFish.tr
  const all = allFish[language] || allFish.tr

  // Popülerleri listeden çıkar (tekrar etmesin)
  const remaining = all.filter(fish => !popular.includes(fish))

  return {
    popular,
    alphabetical: remaining,
    otherLabel: language === 'en' ? 'Other (type manually)' : 'Diğer (elle yaz)'
  }
}
