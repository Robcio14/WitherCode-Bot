// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|


const { EmbedBuilder, Embed} = require('discord.js');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const {customId, guild, user} = interaction;
        if (!interaction.isStringSelectMenu()) {
            return;
        }
        if (customId === "cennik") {
            if (interaction.values[0] === 'discord_bot') {
                const embed = new EmbedBuilder()
                    .setTitle("WitherCode | Cennik Botów Discord")
                    .setDescription(`
                    > Wykonawcy: Dwayne, spoQuj,reynous

                    Opcje Pakietów:

                    Pakiet Standard:                    
                    Cena:
                    30 PLN (BLIK, PayPal, Przelew)
                    40 PLN (PaySafeCard)
                    Zawartość:

                    Komendy administratorskie
                    Statystyki
                    Generator Wiadomości Embed
                    Powitania & Pożegnania
                    Weryfikacja
                    Propozycje
                    Wiadomości przy boostowaniu serwera
                    
                    Pakiet Medium:            
                    Cena:
                    50 PLN (BLIK, PayPal, Przelew)
                    60 PLN (PaySafeCard)
                    Zawartość:

                    Wszystko z Pakietu Standard
                    Antyreklama & Antylink
                    Konkursy
                    Logi moderacyjne
                    
                    Pakiet Hard:
                    Cena:
                    80 PLN (BLIK, PayPal, Przelew)
                    90 PLN (PaySafeCard)
                    Zawartość:

                    Wszystko z Pakietu Medium
                    Logi serwerowe
                    Podstawowe ankiety
                    Tickety
                    
                    Usługi dodatkowe:
                    Oferujemy również indywidualne wyceny na życzenie klienta.
                    `)
                    .setColor('#0099ff')
                    .setFooter(({ text: "WitherCode - Cennik" }));
                interaction.reply({ embeds: [embed], ephemeral:true });

            }
            if (interaction.values[0] === 'grafiki') {
                const embed1 = new EmbedBuilder()
                    .setTitle("WitherCode  | Cennik Grafik")
                    .setDescription(`
                    > Wykonawcy: kubixrzep_,spoquj 
                    
                    | Każde zamówienie jest wyceniane indywidualnie w zależności od specyficznych wymagań klienta. 
                    | Jeśli jesteś zainteresowany, prosimy o utworzenie zgłoszenia w kanale https://discord.com/channels/1264160218766512220/1264160220876378189. 
                    | W utworzonym tickecie opisz swoje potrzeby, abyśmy mogli dokładnie dopasować nasze usługi do Twoich oczekiwań i w pełni zrealizować Twoje zlecenie.                    
                    `).setColor('#0099ff')
                    .setFooter(({ text: "WitherCode - Cennik" }));
                interaction.reply({ embeds: [embed1], ephemeral:true });

            }
            if (interaction.values[0] === 'plugins') {
                const embed2 = new EmbedBuilder()
                    .setTitle("WitherCode | Cennik Pluginów Minecraft ")
                    .setDescription(`
                    > Wykonawca: _poldek 
                    | Każde zamówienie jest wyceniane indywidualnie w zależności od specyficznych wymagań klienta. 
                    |Jeśli jesteś zainteresowany, prosimy o utworzenie zgłoszenia w kanale https://discord.com/channels/1264160218766512220/1264160220876378189. 
                    | W utworzonym tickecie opisz swoje potrzeby, abyśmy mogli dokładnie dopasować nasze usługi do Twoich oczekiwań i w pełni zrealizować Twoje zlecenie.
                     `).setColor('#0099ff')
                    .setFooter(({ text: "WitherCode - Cennik" }));
                interaction.reply({ embeds: [embed2], ephemeral:true });

            }
            if (interaction.values[0]=== ' skrypt') {
                const embed3 = new EmbedBuilder()
                    .setTitle("WitherCode | Cennik Skryptów")
                    .setDescription(`
                    > Wykonawcy: 4k7_,doxsina
                    | Każde zamówienie jest wyceniane indywidualnie w zależności od specyficznych wymagań klienta. 
                    | Jeśli jesteś zainteresowany, prosimy o utworzenie zgłoszenia w kanale https://discord.com/channels/1264160218766512220/1264160220876378189. 
                    | W utworzonym tickecie opisz swoje potrzeby, abyśmy mogli dokładnie dopasować nasze usługi do Twoich oczekiwań i w pełni zrealizować Twoje zlecenie.

                    `)
                    .setColor('#0099ff')
                    .setFooter(({ text: "WitherCode - Cennik" }));
                interaction.reply({ embeds: [embed2], ephemeral:true });

            }
            if (interaction.values[0] === "serwdc") {
                const embed4 = new EmbedBuilder()
                    .setTitle("WitherCode | Cennik Serwerów Discord")
                    .setDescription(`
                    > Wykonawca: Bialyninja .SpoQuj

                    > Pakiety:
                    > Brąz:
                    > Cena: 15 zł (wszystkie formy płatności)
                    
                    > Zawartość:
                    
                    > Podstawowy serwer
                    > Proste kanały i boty
                    > Brak zaawansowanej konfiguracji
                    > Srebro:
                    > Cena: 20 zł (wszystkie formy płatności)
                    
                    > Zawartość:
                    
                    > Podstawowy serwer z bardziej rozwiniętymi kanałami
                    > Podstawowe boty
                    > Brak zaawansowanej konfiguracji
                    > Złoto:
                    > Cena: 25 zł (wszystkie formy płatności)
                    
                    > Zawartość:
                    
                    > Średniej wielkości serwer
                    > Rozbudowane kanały i rangi
                    > Konfiguracja bardziej zaawansowanych botów
                    > Statystyki
                    > Diament:
                    > Cena: 30 zł (wszystkie formy płatności)
                    
                    > Zawartość:
                    
                    > Duży serwer
                    > Zaawansowane kanały i rangi
                    > Konfiguracja botów
                    > Statystyki
                    > Alerty o wejściach i wyjściach
                    > Weryfikacja
                    > Szmaragd:
                    > Cena: 50 zł (wszystkie formy płatności)
                    
                    > Zawartość:
                    
                    > Najbardziej kompleksowy serwer
                    > Pełna konfiguracja
                    > System ekonomii
                    > Statystyki
                    > Weryfikacja
                    > Lobby
                    > Opracowanie i opisanie kanałów
                    > Ustawienie autoroli i self-roli w embedzie
                    > Logi i inne funkcje
                    > Pakiety Specjalne:
                    > Minecraft:
                    > Cena: 20 zł (wszystkie formy płatności)
                    
                    > Zawartość:
                    
                    > Serwer przygotowany pod Minecraft
                    > Kanały ogłoszeń
                    > Self-role
                    > Weryfikacja
                    > Rangi
                    > Strefa zabaw i inne
                    > RolePlay:
                    > Cena: 15 zł (wszystkie formy płatności)
                    
                    > Zawartość:
                    
                    > Serwer pod GTA RP
                    > Zadbany i profesjonalnie przygotowany
                    > Wszystkie niezbędne funkcje
                    > Community:
                    > Cena: 30 zł (wszystkie formy płatności)
                    
                    > Zawartość:
                    
                    > Serwer społecznościowy
                    > Strefa zabaw
                    > Kompletnie przygotowany do startu

                    `)
                    .setColor('#0099ff')
                    .setFooter(({ text: "WitherCode - Cennik" }));
                interaction.reply({ embeds: [embed4], ephemeral:true });



            }
        }
    }}