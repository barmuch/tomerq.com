const converterAngka = (angka) => {
    const birler = ['sıfır', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];
    const onlar = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
    const yuzler = ['', 'yüz', 'iki yüz', 'üç yüz', 'dört yüz', 'beş yüz', 'altı yüz', 'yedi yüz', 'sekiz yüz', 'dokuz yüz'];
    const binler = ['bin', 'bir bin', 'iki bin', 'üç bin', 'dört bin', 'beş bin', 'altı bin', 'yedi bin', 'sekiz bin', 'dokuz bin'];
    const milyonlar = ['milyon', 'bir milyon', 'iki milyon', 'üç milyon', 'dört milyon', 'beş milyon', 'altı milyon', 'yedi milyon', 'sekiz milyon', 'dokuz milyon'];
    const pas = ['on', 'yüz', 'bin', 'on bin', 'yüz bin']
    

    let teks = ''
    
    if  (angka > 9999999) {
        return 'Angka terlalu besar'
    }
    
    if (angka === 0) {
        return birler[0];
    }

    if (angka === 10) {
        return pas[0]
    };

    if (angka === 100) {
        return pas[1]
    }

    if (angka === 1000) {
        return pas[2]
    }

    if (angka === 10000) {
        return pas[3]
    }

    if (angka === 100000) {
        return pas[4]
    };

    if (angka < 10000) {
            // Binler
            let bin = Math.floor(angka / 1000);
            if (bin > 0) {
                if (bin === 1){
                    teks += 'bin' + ' '
                    angka %= 1000
                } else {
                teks += binler[bin] + ' ';
                angka %= 1000;
                }
                
            }

            // Yüzler
            let yuz = Math.floor(angka / 100);
            if (yuz > 0) {
                teks += yuzler[yuz] + ' ';
                angka %= 100;
            }

            // Onlar ve Birler
            if (angka > 0) {
                if (teks !== '') {
                    teks += ' ';
                }

                if (angka < 10) {
                    teks += birler[angka];
                } else if (angka < 20) {
                    // Penanganan khusus untuk angka 11-19
                    const birlik = angka % 10;
                    teks += onlar[1] + ' ' + birler[birlik];
                } else {
                    const birlik = angka % 10;
                    const onluk = Math.floor(angka / 10);
                    teks += onlar[onluk] + ' ';
                    if (birlik !== 0) {
                        teks += birler[birlik];
                    }
                }
            }
            return teks.trim()
    } 

    // Milyonlar
    let milyon = Math.floor(angka / 1000000);
    if (milyon > 0) {
        teks += milyonlar[milyon] + ' ';
        angka %= 1000000;
    }
    // yuz binler
    let yuzBin = Math.floor(angka/100000)
    if (yuzBin > 0) {
        teks += yuzler[yuzBin] + ' ' ;
        angka %= 100000
    }
    // On Binler
    let onBin = Math.floor(angka / 10000);
    
    if (onBin > 0) {
        teks += onlar[onBin] + ' ' ;
        angka %= 10000;
    }
    let bin = Math.floor(angka / 1000);
            if (bin > 0) {
                if (bin === 1){
                    teks += binler[bin] + ' '
                    angka %= 1000
                } else {
                teks += binler[bin] + ' ';
                angka %= 1000;
                }
                
            }

            // Yüzler
            let yuz = Math.floor(angka / 100);
            if (yuz > 0) {
                teks += yuzler[yuz] + ' ';
                angka %= 100;
            }

            // Onlar ve Birler
            if (angka > 0) {
                if (teks !== '') {
                    teks += ' ';
                }

                if (angka < 10) {
                    teks += birler[angka];
                } else if (angka < 20) {
                    // Penanganan khusus untuk angka 11-19
                    const birlik = angka % 10;
                    teks += onlar[1] + ' ' + birler[birlik];
                } else {
                    const birlik = angka % 10;
                    const onluk = Math.floor(angka / 10);
                    teks += onlar[onluk] + ' ';
                    if (birlik !== 0) {
                        teks += birler[birlik];
                    }
                }
            }

    return teks.trim();
};

export default converterAngka;
