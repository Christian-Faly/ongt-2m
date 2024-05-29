
const sqlCreateFkt = "CREATE TABLE IF NOT EXISTS fokontany"+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, region TEXT, district TEXT, "+
        "commune TEXT, fokontany TEXT, situation TEXT)"

const sqlSelectFkt = "SELECT commune||'('||count(*)||')' as district FROM fokontany GROUP BY commune"

const sqlInsertFkt = "INSERT INTO fokontany ( region , district, commune, fokontany, situation)"+
        " VALUES "+
        "('MENABE','Belo sur Tsiribihina','Bemarivo Ankirondro','Ankirondro avaratra','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Bemarivo Ankirondro','Ankirondro atsimo','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Bemarivo Ankirondro','Bevoay','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Bemarivo Ankirondro','Vohimary','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Bemarivo Ankirondro','Mahavelonarivo','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Bemarivo Ankirondro','Ankilizato','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Bemarivo Ankirondro','Mangotroky','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Bemarivo Ankirondro','Ampasimandroatsy','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Tsimafana','Tsimafana','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Tsimafana','Mananjaky','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Tsimafana','Tsitakabasia','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Tsimafana','Tsaratompo ','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Tsimafana','Kiboy ','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Tsimafana','Tsianaloky ','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Tsimafana','Berendriky ','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Tsimafana','Kaday ','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Tsimafana','Anj�','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Tsimafana','Amboanio ','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Tsimafana','Ambohibary ','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Tsimafana','Tanandava','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Tsimafana','Ampanihy','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Tsimafana','Berendriky ','Extension'),"+
        "('MENABE','Belo sur Tsiribihina','Tsaraotana','Tsarahotana','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Tsaraotana','Mahasoa','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Tsaraotana','Antroboky','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Tsaraotana','Antsiraraky','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Tsaraotana','Mialiloha','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Tsaraotana','Tanandava','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Tsaraotana','Tanambao','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Tsaraotana','Andimaky','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Tsaraotana','Antsetaky','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Tsaraotana','Andranomandeha','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Antsoha','Antsoha','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Antsoha','Ankarena','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Antsoha','Ankorokily','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Antsoha','Bebozaky','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Antsoha','Bekilikely','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Antsoha','Bekily I','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Antsoha','Mahasoa-Lavaheloka','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Belinta','Belinta','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Belinta','Soaserana','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Belinta','Ankilimid�','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Belinta','Antalafotsy','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Belinta','Ankotrofotsy','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Belinta','Antanandava','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Belinta','Bemokarana','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Belinta','Madoso','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Belinta','Andaranomiolaka','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Berevo','Berevo','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Berevo','Soanafindra','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Berevo','Fenoarivo Bara','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Berevo','Tsarahonenana','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Berevo','Tsangoragna','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Berevo','Mahavelo','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Berevo','Andimado','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Berevo','Tsimaloto','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Ankiroroky','Begidro','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Ankiroroky','Behera','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Ankiroroky','Andranomena','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Ankiroroky','Sakadomo','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Ankiroroky','Ankiroroky','Consolidation'),"+
        "('MENABE','Belo sur Tsiribihina','Ankiroroky','Ambakaka','Consolidation'),"+
        "('MENABE','Miandrivazo','Manambina','Manambina','Consolidation'),"+
        "('MENABE','Miandrivazo','Manambina','Marolefo','Consolidation'),"+
        "('MENABE','Miandrivazo','Manambina','Ambalabe','Consolidation'),"+
        "('MENABE','Miandrivazo','Manambina','Soatanimbary','Consolidation'),"+
        "('MENABE','Miandrivazo','Manambina','Andraketa','Consolidation'),"+
        "('MENABE','Miandrivazo','Manambina','Anosy','Consolidation'),"+
        "('MENABE','Miandrivazo','Manambina','Ankaboka','Consolidation'),"+
        "('MENABE','Miandrivazo','Ambatolahy','Ambatolahy I','Consolidation'),"+
        "('MENABE','Miandrivazo','Ambatolahy','Ambatolahy II','Consolidation'),"+
        "('MENABE','Miandrivazo','Ambatolahy','Antevamena','Consolidation'),"+
        "('MENABE','Miandrivazo','Ambatolahy','Mahavavy','Consolidation'),"+
        "('MENABE','Miandrivazo','Ambatolahy','Ankazoambo','Consolidation'),"+
        "('MENABE','Miandrivazo','Ambatolahy','Ankotrofotsy Mahasoa','Consolidation'),"+
        "('MENABE','Miandrivazo','Ambatolahy','Analamitsivalana','Consolidation'),"+
        "('MENABE','Miandrivazo','Ambatolahy','Tsiandrarafa','Consolidation'),"+
        "('MENABE','Miandrivazo','Isalo','Analambiby','Consolidation'),"+
        "('MENABE','Miandrivazo','Isalo','Isalo','Consolidation'),"+
        "('MENABE','Miandrivazo','Isalo','Tanambao','Consolidation'),"+
        "('MENABE','Miandrivazo','Isalo','Soatana Morlot','Consolidation'),"+
        "('MENABE','Miandrivazo','Isalo','Bepeha','Consolidation'),"+
        "('MENABE','Miandrivazo','Isalo','Bebako','Consolidation'),"+
        "('MENABE','Miandrivazo','Isalo','Antsikida','Consolidation'),"+
        "('MENABE','Miandrivazo','Isalo','Beoro','Consolidation'),"+
        "('MENABE','Miandrivazo','Isalo','Mahatsinjo','Consolidation'),"+
        "('MENABE','Miandrivazo','Ankotrofotsy','Ambalakida','Consolidation'),"+
        "('MENABE','Miandrivazo','Ankotrofotsy','Anosimanitsy','Consolidation'),"+
        "('MENABE','Miandrivazo','Ankotrofotsy','Ankotrofotsy','Consolidation'),"+
        "('MENABE','Miandrivazo','Ankotrofotsy','Belolo','Consolidation'),"+
        "('MENABE','Miandrivazo','Ankotrofotsy','Ankerika','Consolidation'),"+
        "('MENABE','Miandrivazo','Ankotrofotsy','Soarivo','Consolidation'),"+
        "('MENABE','Miandrivazo','Ankotrofotsy','Antsoha','Consolidation'),"+
        "('MENABE','Miandrivazo','Ankotrofotsy','Soatana Ibofo','Consolidation'),"+
        "('MENABE','Miandrivazo','Ankotrofotsy','Ambonara','Consolidation'),"+
        "('MENABE','Miandrivazo','Ankotrofotsy','Marotongo','Consolidation'),"+
        "('MENABE','Miandrivazo','Ankotrofotsy','Ankazondringitra','Consolidation'),"+
        "('MENABE','Miandrivazo','Ankotrofotsy','Mangarivotra','Consolidation'),"+
        "('MENABE','Miandrivazo','Ankotrofotsy','Beraketa','Consolidation'),"+
        "('MENABE','Miandrivazo','Ankotrofotsy','Ankisira','Consolidation'),"+
        "('MENABE','Miandrivazo','Anosimena','Anosimena','Extension'),"+
        "('MENABE','Miandrivazo','Anosimena','Masiakampy','Extension'),"+
        "('MENABE','Miandrivazo','Anosimena','Ampihiky','Extension'),"+
        "('MENABE','Miandrivazo','Anosimena','Anivorano','Extension'),"+
        "('MENABE','Miandrivazo','Anosimena','Antsakoamadinika','Extension'),"+
        "('MENABE','Miandrivazo','Anosimena','Antanantsoa','Extension'),"+
        "('MENABE','Miandrivazo','Anosimena','Ankilimisarotra','Extension'),"+
        "('MENABE','Miandrivazo','Ampanihy','Ampanihy','Extension'),"+
        "('MENABE','Miandrivazo','Ampanihy','Beteva','Extension'),"+
        "('MENABE','Miandrivazo','Ampanihy','Anahidrano','Extension'),"+
        "('MENABE','Miandrivazo','Bemahatazana','Bemahatazana','Extension'),"+
        "('MENABE','Miandrivazo','Bemahatazana','Antalafotsy','Extension'),"+
        "('MENABE','Miandrivazo','Bemahatazana','Ankazomanga','Extension'),"+
        "('MENABE','Miandrivazo','Bemahatazana','Sahambano','Extension'),"+
        "('MENABE','Miandrivazo','Bemahatazana','Tsianaloka','Extension'),"+
        "('MENABE','Miandrivazo','Andranomainty','Andranomainty','Extension'),"+
        "('MENABE','Miandrivazo','Andranomainty','Tsarafidy','Extension'),"+
        "('MENABE','Miandrivazo','Andranomainty','Betalatala','Extension'),"+
        "('MENABE','Miandrivazo','Andranomainty','Andranokarato','Extension'),"+
        "('MENABE','Miandrivazo','Andranomainty','Mahasoa','Extension'),"+
        "('MENABE','Miandrivazo','Andranomainty','Ambatomena','Extension'),"+
        "('MENABE','Miandrivazo','Andranomainty','Morarano','Extension'),"+
        "('MENABE','Miandrivazo','Miandrivazo','Miandrivazo I','Extension'),"+
        "('MENABE','Miandrivazo','Miandrivazo','Miandrivazo II','Extension'),"+
        "('MENABE','Miandrivazo','Miandrivazo','Ampanasana','Extension'),"+
        "('MENABE','Miandrivazo','Miandrivazo','Amboloando','Extension'),"+
        "('MENABE','Miandrivazo','Miandrivazo','Mamotsatanana','Extension'),"+
        "('MENABE','Miandrivazo','Miandrivazo','Andromay','Extension'),"+
        "('MENABE','Miandrivazo','Miandrivazo','Antanimainty','Extension'),"+
        "('MENABE','Miandrivazo','Miandrivazo','Andolobe','Extension'),"+
        "('MENABE','Miandrivazo','Miandrivazo','Tsinjorano','Extension'),"+
        "('MENABE','Miandrivazo','Miandrivazo','Anarabe','Extension'),"+
        "('MENABE','Miandrivazo','Miandrivazo','Ambondrombe','Extension'),"+
        "('MENABE','Mahabo','Mandabe','Ankilimanjaka','Extension'),"+
        "('MENABE','Mahabo','Mandabe','Ambinany Maharivo','Extension'),"+
        "('MENABE','Mahabo','Mandabe','Ambinany Zama','Extension'),"+
        "('MENABE','Mahabo','Mandabe','Anja','Extension'),"+
        "('MENABE','Mahabo','Mandabe','Mananjaka','Extension'),"+
        "('MENABE','Mahabo','Mandabe','Besely Sud','Extension'),"+
        "('MENABE','Mahabo','Mandabe','Fandroa','Extension'),"+
        "('MENABE','Mahabo','Mandabe','Mandabe I','Extension'),"+
        "('MENABE','Mahabo','Mandabe','Mandabe II','Extension'),"+
        "('MENABE','Mahabo','Mandabe','Soatana','Extension'),"+
        "('MENABE','Mahabo','Mandabe','Bekotroho','Extension'),"+
        "('MENABE','Mahabo','Mandabe','Ambararatanomby','Extension'),"+
        "('MENABE','Mahabo','Mandabe','Ambango','Extension'),"+
        "('MENABE','Mahabo','Ankilizato','Tsianolaka','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Ambiky','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Ampandrabe','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Ampandramena','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Andranomalio','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Andimaky Mahazoarivo','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Ankatoky Sakamaly','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Ankilizato Avaradrano','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Ankilizato Atsimondrano','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Beoky','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Filanjara','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Ankilizato Centre','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Ankilizato Est','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Ankilizato Nord','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Andranotafika','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Andranomatavy','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Beronono','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Morafeno','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Mavokiso','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Ankoba Ambatovita','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Antsingilo','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Tanandava','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Fenoarivo','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Antsanaloka Andoharano','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Ambahibe','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Ankilizato Andranovory','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Manomba','Consolidation'),"+
        "('MENABE','Mahabo','Ankilizato','Morarano','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Amboanara Nord','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Mahasoa Nord','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Marolita','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Androtsy','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Anosimbazaha','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Tambazo','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Mahatsinjo Est','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Ankerika','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Mandarano','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Fenoarivo Pomay','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Mahasoa Pomay','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Soarano','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Malaimbandy','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Beampingaratsy','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Pomay','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Antazoa','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Ankilibe','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Tsinjorano','Consolidation'),"+
        "('MENABE','Mahabo','Malaimbandy','Ankarenambe','Consolidation'),"+
        "('MENABE','Mahabo','Ambia',' Ambia','Consolidation'),"+
        "('MENABE','Mahabo','Ambia','Ankilimanatsara','Consolidation'),"+
        "('MENABE','Mahabo','Ambia','Bevahy','Consolidation'),"+
        "('MENABE','Mahabo','Ambia','Soatanimbary','Consolidation'),"+
        "('MENABE','Mahabo','Ambia','Tamotamo','Consolidation'),"+
        "('MENABE','Mahabo','Ambia','Taolamboay','Consolidation'),"+
        "('MENABE','Mahabo','Ambia','Soaserana','Consolidation'),"+
        "('MENABE','Mahabo','Beronono',' Analamahavelo','Consolidation'),"+
        "('MENABE','Mahabo','Beronono','Berenty Ambiky','Consolidation'),"+
        "('MENABE','Mahabo','Beronono','Beronono','Consolidation'),"+
        "('MENABE','Mahabo','Beronono','Fenoarivo','Consolidation'),"+
        "('MENABE','Mahabo','Beronono','Maharivokely','Consolidation'),"+
        "('MENABE','Mahabo','Beronono','Ambalabe','Consolidation'),"+
        "('MENABE','Mahabo','Tsimazava','Tsimazava','Consolidation'),"+
        "('MENABE','Mahabo','Tsimazava','Mahavagno','Consolidation'),"+
        "('MENABE','Mahabo','Tsimazava','Ampandramaneno','Consolidation'),"+
        "('MENABE','Mahabo','Tsimazava','Antsakoazato','Consolidation'),"+
        "('MENABE','Mahabo','Tsimazava','Ikaosy','Consolidation'),"+
        "('MENABE','Mahabo','Tsimazava','Sakapaly','Consolidation'),"+
        "('MENABE','Mahabo','Tsimazava','Fenoarivo','Consolidation'),"+
        "('MENABE','Mahabo','Tsimazava','Tsinjorano','Consolidation'),"+
        "('MENABE','Manja','Manja','Ambalanomby','Extension'),"+
        "('MENABE','Manja','Manja','Andasibe','Extension'),"+
        "('MENABE','Manja','Manja','Andoharano','Extension'),"+
        "('MENABE','Manja','Manja','Andranomiteraky','Extension'),"+
        "('MENABE','Manja','Manja','Andranovorinampela','Extension'),"+
        "('MENABE','Manja','Manja','Androbontsiabo','Extension'),"+
        "('MENABE','Manja','Manja','Androtsy','Extension'),"+
        "('MENABE','Manja','Manja','Antanimainty ouest','Extension'),"+
        "('MENABE','Manja','Manja','Mangamirafy','Extension'),"+
        "('MENABE','Manja','Manja','Manja I','Extension'),"+
        "('MENABE','Manja','Manja','Manja II','Extension'),"+
        "('MENABE','Manja','Manja','Miary','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Ankiliabo','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Ambahia','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Ankatsakatsa','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Besaka','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Besatrohaka','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Betamenaka','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Fiadana','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Marolafika','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Rangainomby','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Bengy','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Tanambao','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Tongarivo Nord','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Ambivy II','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Amborovoka','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Antselibe','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Marivorano','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Nosimbondro','Extension'),"+
        "('MENABE','Manja','Ankiliabo','Tanatsimira','Extension'),"+
        "('MENABE','Manja','Beharona','Agnadabo','Extension'),"+
        "('MENABE','Manja','Beharona','Beharona','Extension'),"+
        "('MENABE','Manja','Beharona','Dindoha','Extension'),"+
        "('MENABE','Manja','Beharona','ianandranto','Extension'),"+
        "('MENABE','Manja','Beharona','Malandira Sud','Extension'),"+
        "('MENABE','Manja','Beharona','Somenda','Extension'),"+
        "('MENABE','Manja','Beharona','Tongarivo Est','Extension'),"+
        "('MENABE','Manja','Beharona','Troboambola','Extension'),"+
        "('MENABE','Manja','Beharona','Vatolampy','Extension'),"+
        "('MENABE','Manja','Beharona','Vondrove','Extension'),"+
        "('MENABE','Manja','Soserana','Anderika','Extension'),"+
        "('MENABE','Manja','Soserana','Antevamena Sarodrano','Extension'),"+
        "('MENABE','Manja','Soserana','Fenoarivo Tsienimboay','Extension'),"+
        "('MENABE','Manja','Soserana','Miary Soalengo','Extension'),"+
        "('MENABE','Manja','Soserana','Soaserana','Extension'),"+
        "('MENABE','Manja','Soserana','Vohimary','Extension'),"+
        "('MENABE','Manja','Anontsibe','Anja','Extension'),"+
        "('MENABE','Manja','Anontsibe','Anjaloaka','Extension'),"+
        "('MENABE','Manja','Anontsibe','Anontsibe Centre','Extension'),"+
        "('MENABE','Manja','Anontsibe','Anontsibe Est','Extension'),"+
        "('MENABE','Manja','Anontsibe','Anontsikely','Extension'),"+
        "('MENABE','Manja','Anontsibe','Antanimahavelo','Extension'),"+
        "('MENABE','Manja','Anontsibe','Antaranta','Extension'),"+
        "('MENABE','Manja','Anontsibe','Antsavoa','Extension'),"+
        "('MENABE','Manja','Anontsibe','Bevava','Extension'),"+
        "('MENABE','Manja','Anontsibe','Beravy','Extension'),"+
        "('MENABE','Manja','Anontsibe','Tongarivo Sakalava','Extension'),"+
        "('MENABE','Manja','Andranopasy',' Andranopasy I','Extension'),"+
        "('MENABE','Manja','Andranopasy','Andranopasy II','Extension'),"+
        "('MENABE','Manja','Andranopasy','Ankoba','Extension'),"+
        "('MENABE','Manja','Andranopasy','Antaly','Extension'),"+
        "('MENABE','Manja','Andranopasy','Ambatobe','Extension'),"+
        "('MENABE','Manja','Andranopasy','Befamonty','Extension'),"+
        "('MENABE','Manja','Andranopasy','Tsianihy','Extension'),"+
        "('MENABE','Manja','Andranopasy','Nosibe','Extension'),"+
        "('MENABE','Manja','Betsioky',' Betsioky','Extension'),"+
        "('MENABE','Manja','Betsioky','Soamarebe','Extension'),"+
        "('MENABE','Manja','Betsioky','Tahiboraka','Extension'),"+
        "('MENABE','Manja','Betsioky','Sorita','Extension'),"+
        "('MENABE','Manja','Betsioky','Besely','Extension'),"+
        "('MENABE','Morondava','Befasy',' Befasy','Extension'),"+
        "('MENABE','Morondava','Befasy','Andranomamy','Extension'),"+
        "('MENABE','Morondava','Befasy','Antevamena','Extension'),"+
        "('MENABE','Morondava','Befasy','Ambahivahibe','Extension'),"+
        "('MENABE','Morondava','Befasy','Beleo','Extension'),"+
        "('MENABE','Morondava','Befasy','Bevantaza','Extension'),"+
        "('MENABE','Morondava','Befasy','Lavaravy Tsiamaliha','Extension'),"+
        "('MENABE','Morondava','Befasy','Lohena','Extension'),"+
        "('MENABE','Morondava','Befasy','Menarandra','Extension'),"+
        "('MENABE','Morondava','Befasy','Misokitse','Extension'),"+
        "('MENABE','Morondava','Befasy','Soarano Bekininy','Extension'),"+
        "('MENABE','Morondava','Befasy','Tanandava','Extension'),"+
        "('MENABE','Morondava','Befasy','Andranotojy','Extension'),"+
        "('MENABE','Morondava','Befasy','Androtsy','Extension'),"+
        "('MENABE','Morondava','Befasy','Behera Mahasoa','Extension'),"+
        "('MENABE','Morondava','Befasy','Betakilotsy','Extension'),"+
        "('MENABE','Morondava','Befasy','Mitsitiky','Extension'),"+
        "('MENABE','Morondava','Belo sur mer','Belo Sur Mer','Extension'),"+
        "('MENABE','Morondava','Belo sur mer','Ambararata','Extension'),"+
        "('MENABE','Morondava','Belo sur mer','Andika Est','Extension'),"+
        "('MENABE','Morondava','Belo sur mer','Andika Sur Mer','Extension'),"+
        "('MENABE','Morondava','Belo sur mer','Ankevo Est','Extension'),"+
        "('MENABE','Morondava','Belo sur mer','Ankevo Sur Mer','Extension'),"+
        "('MENABE','Morondava','Belo sur mer','Ankilifolo','Extension'),"+
        "('MENABE','Morondava','Belo sur mer','Antsira','Extension'),"+
        "('MENABE','Morondava','Belo sur mer','Farateny','Extension'),"+
        "('MENABE','Morondava','Belo sur mer','Manometinay','Extension'),"+
        "('MENABE','Morondava','Belo sur mer','Marofihitra','Extension'),"+
        "('MENABE','Morondava','Belo sur mer','Marovitika','Extension'),"+
        "('MENABE','Morondava','Belo sur mer','Namakia','Extension'),"+
        "('MENABE','Morondava','Belo sur mer','Voloe II','Extension'),"+
        "('MELAKY','Antsalova','Antsalova','Antsalova','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Ambonara','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Anjiabe','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Antsalovabe','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Arindrano','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Berano','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Masama','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Ampamoty','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Saririaka','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Ankotrofotsy','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Ambalakazaha','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Ambalavondro','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Antsalova','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Ampasimbe','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Belinta','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Angora','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Ambohimena','Consolidation'),"+
        "('MELAKY','Antsalova','Antsalova','Soarano','Consolidation'),"+
        "('MELAKY','Antsalova','Bekopaka','Bekopaka','Consolidation'),"+
        "('MELAKY','Antsalova','Bekopaka','Andranolava','Consolidation'),"+
        "('MELAKY','Antsalova','Bekopaka','Begara','Consolidation'),"+
        "('MELAKY','Antsalova','Bekopaka','Tsinjorano','Consolidation'),"+
        "('MELAKY','Antsalova','Bekopaka','Ambalakazaha Bekopaka','Consolidation'),"+
        "('MELAKY','Antsalova','Bekopaka','Bereketa','Consolidation'),"+
        "('MELAKY','Antsalova','Bekopaka','Ankilitelo','Consolidation'),"+
        "('MELAKY','Antsalova','Bekopaka','Mangnavony','Consolidation'),"+
        "('MELAKY','Antsalova','Bekopaka','Antsarona','Consolidation'),"+
        "('MELAKY','Antsalova','Bekopaka','Beampinga Ankilisoa','Consolidation'),"+
        "('MELAKY','Antsalova','Trangahy','Trangahy','Consolidation'),"+
        "('MELAKY','Antsalova','Trangahy','Soatana','Consolidation'),"+
        "('MELAKY','Antsalova','Trangahy','Berongony','Consolidation'),"+
        "('MELAKY','Antsalova','Trangahy','Mafiovy Korao','Consolidation'),"+
        "('MELAKY','Antsalova','Trangahy','Benjangoa','Consolidation'),"+
        "('MELAKY','Antsalova','Trangahy','Antsalaza','Consolidation'),"+
        "('MELAKY','Antsalova','Trangahy','Fenoarivo-bara','Consolidation'),"+
        "('MELAKY','Antsalova','Trangahy','Ankilijoroa','Consolidation'),"+
        "('MELAKY','Antsalova','Trangahy','Ankorabato','Consolidation'),"+
        "('MELAKY','Antsalova','Soahany','Soahany','Consolidation'),"+
        "('MELAKY','Antsalova','Soahany','Besar� ambony','Consolidation'),"+
        "('MELAKY','Antsalova','Soahany','Mokotibe ','Consolidation'),"+
        "('MELAKY','Antsalova','Soahany','Tsianaloka ','Consolidation'),"+
        "('MELAKY','Antsalova','Soahany','Bemonto','Consolidation'),"+
        "('MELAKY','Antsalova','Soahany','Betakilotra ','Consolidation'),"+
        "('MELAKY','Antsalova','Soahany','Bemia ','Consolidation'),"+
        "('MELAKY','Antsalova','Masoarivo','Ambalakazaha','Consolidation'),"+
        "('MELAKY','Antsalova','Masoarivo','Ambalamanga','Consolidation'),"+
        "('MELAKY','Antsalova','Masoarivo','Amberegny','Consolidation'),"+
        "('MELAKY','Antsalova','Masoarivo','Ambondro','Consolidation'),"+
        "('MELAKY','Antsalova','Masoarivo','Benjavily','Consolidation'),"+
        "('MELAKY','Antsalova','Masoarivo','Bemamba','Consolidation'),"+
        "('MELAKY','Antsalova','Masoarivo','Besar�','Consolidation'),"+
        "('MELAKY','Antsalova','Masoarivo','Bevoay','Consolidation'),"+
        "('MELAKY','Antsalova','Masoarivo','Mahazoarivo','Consolidation'),"+
        "('MELAKY','Antsalova','Masoarivo','Masoarivo','Consolidation'),"+
        "('MELAKY','Antsalova','Bemaraha Atsinanana','Tsiandro','Consolidation'),"+
        "('MELAKY','Antsalova','Bemaraha Atsinanana','Ambondro','Consolidation'),"+
        "('MELAKY','Antsalova','Bemaraha Atsinanana','Mahadengy','Consolidation'),"+
        "('MELAKY','Antsalova','Bemaraha Atsinanana','Bevero','Consolidation'),"+
        "('MELAKY','Maintirano','Andranovao','Manapape','Extension'),"+
        "('MELAKY','Maintirano','Andranovao','Andranovao','Extension'),"+
        "('MELAKY','Maintirano','Andranovao','Ankitara','Extension'),"+
        "('MELAKY','Maintirano','Andranovao','Nivakiambakoly','Extension'),"+
        "('MELAKY','Maintirano','Andranovao','Ambalamanga','Extension'),"+
        "('MELAKY','Maintirano','Tambohorano',' Tambohorano Tanambao','Extension'),"+
        "('MELAKY','Maintirano','Tambohorano','Tambohorano','Extension'),"+
        "('MELAKY','Maintirano','Tambohorano','Mafaiky','Extension'),"+
        "('MELAKY','Maintirano','Tambohorano','Ambolamena','Extension'),"+
        "('MELAKY','Maintirano','Tambohorano','Bemokotra Anasy','Extension'),"+
        "('MELAKY','Maintirano','Bemokotra Sud','Bemokotra sud','Extension'),"+
        "('MELAKY','Maintirano','Bemokotra Sud','Antsafy','Extension'),"+
        "('MELAKY','Maintirano','Bemokotra Sud','Magnapea ','Extension'),"+
        "('MELAKY','Maintirano','Bemokotra Sud','Amborokontsy','Extension'),"+
        "('MELAKY','Maintirano','Bemokotra Sud','Sarodrano','Extension'),"+
        "('MELAKY','Maintirano','Bemokotra Sud','Ankoromokoty','Extension'),"+
        "('MELAKY','Maintirano','Bemokotra Sud','Ankerabe Sud ','Extension'),"+
        "('MELAKY','Maintirano','Bemokotra Sud','Anjiaboroka ','Extension'),"+
        "('MELAKY','Maintirano','Berevo sur Ranobe','Ambiky','Extension'),"+
        "('MELAKY','Maintirano','Berevo sur Ranobe','Berevo','Extension'),"+
        "('MELAKY','Maintirano','Berevo sur Ranobe','Anketsabe ','Extension'),"+
        "('MELAKY','Maintirano','Berevo sur Ranobe','Andimaky','Extension'),"+
        "('MELAKY','Maintirano','Berevo sur Ranobe','Ankerabe nord','Extension'),"+
        "('MELAKY','Maintirano','Bebaboky Sud','Bebaboky','Extension'),"+
        "('MELAKY','Maintirano','Bebaboky Sud','Bemokotra Nord ','Extension'),"+
        "('MELAKY','Maintirano','Bebaboky Sud','Tsiamandira ','Extension'),"+
        "('MELAKY','Maintirano','Bebaboky Sud','Onara ','Extension'),"+
        "('MELAKY','Maintirano','Bebaboky Sud','Bereketa ','Extension'),"+
        "('MELAKY','Maintirano','Bebaboky Sud','Andrafiamivony','Extension'),"+
        "('MELAKY','Maintirano','Bebaboky Sud','Andranoboka ','Extension'),"+
        "('MELAKY','Maintirano','Bebaboky Sud','Amberobe ','Extension'),"+
        "('MELAKY','Maintirano','Veromanga','Veromanga','Extension'),"+
        "('MELAKY','Maintirano','Veromanga','Kimanambolo Sud ','Extension'),"+
        "('MELAKY','Maintirano','Veromanga','Kimanalbolo Nord ','Extension'),"+
        "('MELAKY','Maintirano','Veromanga','Tetezananahary','Extension'),"+
        "('MELAKY','Maintirano','Veromanga','Tsimahamboandro','Extension'),"+
        "('MELAKY','Maintirano','Antsaidoha Bebao','Tsingimavo','Extension'),"+
        "('MELAKY','Maintirano','Antsaidoha Bebao','Beraketa','Extension'),"+
        "('MELAKY','Maintirano','Antsaidoha Bebao','Ampoza','Extension'),"+
        "('MELAKY','Maintirano','Antsaidoha Bebao','Ambahivahy','Extension'),"+
        "('MELAKY','Maintirano','Antsaidoha Bebao','Bekinoly','Extension'),"+
        "('MELAKY','Maintirano','Antsaidoha Bebao','Batsako','Extension'),"+
        "('MELAKY','Maintirano','Antsaidoha Bebao','Ambanja','Extension'),"+
        "('MELAKY','Maintirano','Antsaidoha Bebao','Tsimirandra','Extension'),"+
        "('MELAKY','Maintirano','Maromavo','Maromavo','Extension'),"+
        "('MELAKY','Maintirano','Maromavo','Bemoky','Extension'),"+
        "('MELAKY','Maintirano','Maromavo','Andimaky','Extension'),"+
        "('MELAKY','Maintirano','Mafaijijo','Mafaijijo','Extension'),"+
        "('MELAKY','Maintirano','Mafaijijo','Antsohamaliniky','Extension'),"+
        "('MELAKY','Maintirano','Mafaijijo','Amboloando','Extension'),"+
        "('MELAKY','Maintirano','Mafaijijo','Antanandava Nord','Extension'),"+
        "('MELAKY','Maintirano','Mafaijijo','Ambonara ','Extension'),"+
        "('MELAKY','Maintirano','Mafaijijo','Ankirijifotsy','Extension'),"+
        "('MELAKY','Maintirano','Mafaijijo','Antsanaloka','Extension'),"+
        "('MELAKY','Maintirano','Mafaijijo','Antanandava Sud','Extension'),"+
        "('MELAKY','Maintirano','Mafaijijo','Ambalarano','Extension'),"+
        "('MELAKY','Maintirano','Ankisatra','Ankisatra','Extension'),"+
        "('MELAKY','Maintirano','Ankisatra','Ampatifaty','Extension'),"+
        "('MELAKY','Maintirano','Ankisatra','Befotaka','Extension'),"+
        "('MELAKY','Maintirano','Ankisatra','Ambondro','Extension'),"+
        "('MELAKY','Maintirano','Ankisatra','Nosibe','Extension'),"+
        "('MELAKY','Maintirano','Ankisatra','Ankilifito','Extension'),"+
        "('MELAKY','Maintirano','Ankisatra','Ankazomanambao','Extension'),"+
        "('MELAKY','Maintirano','Ankisatra','Bevatry','Extension'),"+
        "('MELAKY','Maintirano','Betanatanana ','Betanatanana ','Extension'),"+
        "('MELAKY','Maintirano','Betanatanana ','Ambalasatry','Extension'),"+
        "('MELAKY','Maintirano','Betanatanana ','Andranomalio','Extension'),"+
        "('MELAKY','Maintirano','Betanatanana ','Mahavelo','Extension'),"+
        "('MELAKY','Maintirano','Betanatanana ','Mahazoarivo','Extension'),"+
        "('MELAKY','Maintirano','Betanatanana ','Manombo','Extension'),"+
        "('MELAKY','Maintirano','Betanatanana ','Ampanea ','Extension'),"+
        "('MELAKY','Maintirano','Betanatanana ','Amboaniodimy','Extension'),"+
        "('MELAKY','Maintirano','Betanatanana ','Soatana ','Extension'),"+
        "('MELAKY','Maintirano','Betanatanana ','Ambonarabe Mahasoa ','Extension'),"+
        "('MELAKY','Maintirano','Betanatanana ','Matavirano','Extension'),"+
        "('MELAKY','Maintirano','Betanatanana ','Andrafialava ','Extension'),"+
        "('MELAKY','Maintirano','Betanatanana ','Analamamiko','Extension'),"+
        "('MELAKY','Maintirano','Betanatanana ','Morafeno','Extension')"

export {sqlCreateFkt,sqlSelectFkt, sqlInsertFkt}
