create database if not exists mgc;

use mgc;

create table IF NOT EXISTS users (
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    given_name VARCHAR(255) NOT NULL,
    family_name VARCHAR(255) NOT NULL,
    given_kana VARCHAR(255),
    family_kana VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE KEY,
    password VARCHAR(255) NOT NULL,
    division VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    icon_path VARCHAR(255) NOT NULL,
    icon_name VARCHAR(255) NOT NULL,
    description TEXT,
    thema VARCHAR(255) NOT NULL,
    is_admin TINYINT NOT NULL,
    is_stop TINYINT NOT NULL,
    last_update TIMESTAMP NOT NULL)
ENGINE=INNODB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS categories (
    id TINYINT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS events (
    id INTEGER AUTO_INCREMENT NOT NULL,
    user_id INTEGER NOT NULL,
    category_id TINYINT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    detail TEXT NOT NULL,
    begin TIMESTAMP NOT NULL,
    end TIMESTAMP NOT NULL,
    is_temporary TINYINT NOT NULL,
    last_update TIMESTAMP NOT NULL,
    created_date TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
        REFERENCES users (id),
    CONSTRAINT fk_category_id
        FOREIGN KEY (category_id)
        REFERENCES categories (id)
        ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=INNODB DEFAULT CHARSET=utf8;

create table IF NOT EXISTS attendees(
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    event_id INTEGER NOT NULL,
    FOREIGN KEY (event_id)
    REFERENCES events (id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, event_id)
)
ENGINE=INNODB DEFAULT CHARSET=utf8;

-- user isnert
INSERT IGNORE INTO USERS
(id, given_name, family_name, given_kana, family_kana, email, password, division, position, icon_path, icon_name, description, thema, is_admin, is_stop, last_update)
VALUES
('1', 'Satori', 'Sato', 'Satori', 'Sato', 'satou@test.com', '123456', 'Yokohama Div', 'GD', 'dummmypath/path/icon', 'dummyIcon', 'just a discription', 'blue', '0', '0', '2021-07-04 10:32:20 '),
('2', 'Yumi', 'Nishimoto', 'Yumi', 'Nishimoto', 'nishimoto@test.com', '123456', 'Yokohama Div', 'YR1', 'dummmypath/path/icon2', 'dummyIcon2', 'just a discription 2', 'yellow', '0', '0', '2021-07-04 10:32:20 '),
('3', 'Kana', 'Yoko', 'Kana', 'Yoko', 'kano@test.com', '123456', 'Yokohama Div', 'YR2', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'pink', '0', '0', '2021-07-04 10:32:20 ');

-- categories insert
INSERT IGNORE INTO categories (id,name) VALUES (1,"FFF"),(2,"ファンファン"),(3,"はもデイ"),(4,"以下適当なデータ"),(5,"laoreet, libero et"),(6,"cursus vestibulum. Mauris"),(7,"erat, eget tincidunt"),(8,"sed libero. Proin"),(9,"lorem, luctus ut,"),(10,"aliquet, sem ut"),(11,"eu turpis. Nulla"),(12,"libero dui nec"),(13,"cursus non, egestas"),(14,"natoque penatibus et"),(15,"primis in faucibus"),(16,"eget, dictum placerat,"),(17,"Cum sociis natoque"),(18,"at sem molestie"),(19,"tortor, dictum eu,"),(20,"Sed dictum. Proin"),(21,"Mauris non dui"),(22,"Etiam ligula tortor,"),(23,"consectetuer rhoncus. Nullam"),(24,"dictum mi, ac"),(25,"ac nulla. In"),(26,"orci tincidunt adipiscing."),(27,"malesuada id, erat."),(28,"erat. Vivamus nisi."),(29,"massa. Quisque porttitor"),(30,"Cras dolor dolor,"),(31,"iaculis quis, pede."),(32,"fermentum risus, at"),(33,"et ultrices posuere"),(34,"euismod et, commodo"),(35,"enim non nisi."),(36,"Donec sollicitudin adipiscing"),(37,"dictum augue malesuada"),(38,"eget nisi dictum"),(39,"sodales at, velit."),(40,"vulputate ullamcorper magna."),(41,"pede, ultrices a,"),(42,"vel quam dignissim"),(43,"eu erat semper"),(44,"Aliquam adipiscing lobortis"),(45,"ligula. Aenean euismod"),(46,"tortor nibh sit"),(47,"vitae erat vel"),(48,"Suspendisse commodo tincidunt"),(49,"Maecenas mi felis,"),(50,"porta elit, a"),(51,"elit elit fermentum"),(52,"Morbi sit amet"),(53,"erat neque non"),(54,"montes, nascetur ridiculus"),(55,"Aliquam nec enim."),(56,"nisi sem semper"),(57,"mollis. Phasellus libero"),(58,"ultrices posuere cubilia"),(59,"enim, condimentum eget,"),(60,"convallis erat, eget"),(61,"ligula. Aenean euismod"),(62,"posuere cubilia Curae;"),(63,"placerat. Cras dictum"),(64,"in magna. Phasellus"),(65,"consequat purus. Maecenas"),(66,"sapien, gravida non,"),(67,"placerat. Cras dictum"),(68,"at sem molestie"),(69,"eget ipsum. Suspendisse"),(70,"Aliquam fringilla cursus"),(71,"arcu et pede."),(72,"nec, diam. Duis"),(73,"vehicula aliquet libero."),(74,"consectetuer adipiscing elit."),(75,"leo elementum sem,"),(76,"mollis vitae, posuere"),(77,"Aenean egestas hendrerit"),(78,"Fusce aliquet magna"),(79,"velit in aliquet"),(80,"hendrerit neque. In"),(81,"eu nibh vulputate"),(82,"mus. Aenean eget"),(83,"nec metus facilisis"),(84,"a nunc. In"),(85,"vel sapien imperdiet"),(86,"auctor, velit eget"),(87,"egestas, urna justo"),(88,"egestas. Aliquam fringilla"),(89,"magna sed dui."),(90,"Duis sit amet"),(91,"nisi magna sed"),(92,"Suspendisse ac metus"),(93,"risus. In mi"),(94,"Donec sollicitudin adipiscing"),(95,"ipsum ac mi"),(96,"dis parturient montes,"),(97,"ac mattis velit"),(98,"nisi dictum augue"),(99,"dui. Fusce diam"),(100,"eu sem. Pellentesque");

-- events insert
INSERT IGNORE INTO `events` (`id`,`user_id`,`category_id`,`name`,`location`,`detail`,`begin`,`end`,`is_temporary`,`last_update`,`created_date`)
VALUES (1,1,1,"ファンファンファミリー","Zoom on line meeting","【ZoomURL】
https://zoom.us/j/96931512391
ミーティングID: 969 3151 2391
パスコード: 538244
【詳細】
4月のFFFにて決めたアクションプラン(AP)。
あれから約1ヶ月半経ち、どのAPもメンバーと協力しながら活動を進めている頃かと思いますが、「最近APのイベントになかなか参加できていないなー」「他のAP、今どんなことしてるんだろう？」という想いをお持ちの方もいらっしゃるのではないでしょうか。
そんな方に朗報です☝️
今月のFFFは各APの振り返りと活動になります！
#ERROR!
19:30～20:00 各APチーム毎の振り返りMTG
20:00～21:00 AP活動（キャリア座談会）
21:00～ 周知事項
#ERROR!
「横浜のAPって何があったっけ…？」という方！
大丈夫です、以下のリンクで確認できますよ！
https://alhinc.workplace.com/groups/483609602459852/permalink/932638967556911/","2020-01-01 01:52:26","2020-01-01 03:12:36","0","2021-11-05 19:45:49","2021-11-15 13:57:05"),
(2,1,70,"lorem","1553 Dui. Rd.","in, hendrerit consectetuer, cursus et,","2020-04-14 02:07:34","2021-07-01 13:25:32","0","2021-11-01 06:45:55","2022-02-10 10:58:20"),
(3,3,26,"nisl","Ap #563-1753 Et St.","Morbi neque tellus, imperdiet non, vestibulum nec, euismod in,","2020-04-27 16:28:54","2021-06-26 22:52:37","1","2022-01-09 08:34:08","2021-11-28 10:08:10"),
(4,2,7,"ridiculus","273-4517 Faucibus. St.","egestas nunc sed libero. Proin sed turpis nec mauris blandit mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros non enim","2020-05-20 01:14:49","2020-11-16 10:16:31","1","2020-09-23 14:10:14","2020-09-25 13:20:33"),
(5,3,82,"magna","Ap #137-8776 Quisque Av.","eu augue porttitor interdum. Sed auctor odio","2020-01-25 13:31:11","2020-12-20 11:41:40","0","2021-10-11 17:14:25","2022-03-24 16:11:01"),
(6,2,54,"Lorem","P.O. Box 819, 7472 Volutpat. Rd.","quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc","2020-02-21 04:54:29","2020-08-22 14:50:06","0","2021-04-13 20:53:42","2021-05-29 10:14:50"),
(7,1,17,"penatibus","Ap #596-8492 Vitae St.","vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam","2020-02-24 04:54:05","2020-09-07 16:45:42","1","2022-06-21 14:58:52","2021-09-13 14:36:44"),
(8,2,53,"at,","688-8961 Risus. Street","ut eros non enim commodo hendrerit. Donec porttitor","2020-05-29 05:09:18","2021-01-24 11:57:37","1","2022-01-17 14:42:11","2022-04-23 07:14:24"),
(9,2,13,"elementum","Ap #111-9004 Consectetuer St.","dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum","2020-02-18 15:20:16","2021-06-07 04:07:13","1","2020-12-12 14:46:32","2021-12-05 07:54:43"),
(10,2,95,"amet","P.O. Box 772, 1171 Adipiscing Rd.","mi enim, condimentum eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida nunc sed pede. Cum sociis natoque penatibus et magnis dis parturient montes,","2020-02-05 19:21:22","2021-04-25 04:57:47","1","2020-09-05 10:54:45","2022-05-26 00:18:30"),
(11,2,69,"Donec","441-9954 Montes, Rd.","Sed congue,","2020-03-17 16:04:00","2020-06-25 21:33:00","1","2021-06-10 01:28:14","2022-04-20 18:16:00"),
(12,1,38,"pulvinar","P.O. Box 578, 2432 Et, Rd.","leo, in lobortis tellus justo sit amet nulla. Donec non justo. Proin non massa non ante bibendum ullamcorper. Duis","2020-03-04 04:06:09","2021-03-05 13:04:28","0","2020-07-15 03:33:22","2021-01-02 11:34:15"),
(13,2,60,"adipiscing","Ap #838-7409 Consectetuer, St.","tellus id nunc interdum feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet odio. Etiam ligula tortor, dictum eu, placerat eget, venenatis","2020-02-05 20:01:35","2020-11-02 09:28:08","1","2021-12-12 12:49:58","2021-04-16 22:47:22"),
(14,2,54,"per","Ap #826-9410 Aliquam Ave","Sed eu nibh vulputate mauris sagittis placerat.","2020-05-23 11:05:44","2020-08-09 14:11:07","0","2020-10-26 04:34:13","2021-03-11 11:01:53"),
(15,3,18,"tincidunt","P.O. Box 866, 2148 Aptent St.","quam quis diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce aliquet magna a neque. Nullam ut nisi a odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu.","2020-03-09 22:43:17","2020-10-18 06:18:54","0","2021-12-30 13:06:57","2020-10-03 22:05:08"),
(16,3,35,"libero.","Ap #675-2731 Imperdiet Ave","ridiculus mus. Aenean","2020-04-18 16:53:58","2021-05-18 00:36:35","1","2020-10-04 22:22:48","2020-10-14 19:45:50"),
(17,3,31,"ipsum.","Ap #928-6994 Donec Av.","Maecenas malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut lacus. Nulla tincidunt, neque vitae semper egestas, urna justo faucibus lectus, a sollicitudin orci sem eget","2020-04-14 12:44:05","2021-04-30 05:36:36","1","2021-12-08 21:25:43","2021-04-03 20:38:13"),
(18,1,48,"dui.","555-7711 Morbi Avenue","Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare","2020-03-14 00:30:02","2021-05-16 14:26:12","1","2020-07-01 02:41:54","2021-10-24 09:02:14"),
(19,2,87,"Aliquam","Ap #648-2321 Nulla St.","pede sagittis augue, eu tempor erat neque non quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque neque sed sem","2020-02-26 16:26:04","2021-03-01 15:28:27","1","2021-03-10 09:52:51","2022-02-20 23:01:47"),
(20,1,62,"quam","Ap #877-718 Dui. Avenue","nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi sit amet massa. Quisque porttitor eros nec tellus. Nunc lectus pede,","2020-03-11 14:55:29","2020-11-02 08:48:53","0","2022-01-10 22:17:45","2021-09-25 03:31:13"),
(21,2,80,"lectus","Ap #332-3728 Nam Av.","vitae mauris sit amet lorem semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus. In mi pede, nonummy ut, molestie in,","2020-02-15 10:07:22","2020-09-24 15:48:30","1","2021-08-27 22:56:15","2021-03-28 05:23:39"),
(22,3,90,"magna","Ap #164-5544 Sem Avenue","eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida nunc sed pede. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.","2020-05-20 19:30:17","2021-05-30 20:55:09","0","2020-10-12 18:59:39","2021-09-13 02:34:16"),
(23,3,55,"mauris,","P.O. Box 733, 6389 Nulla Avenue","tristique pellentesque, tellus sem mollis dui, in sodales elit","2020-02-04 22:00:12","2021-03-07 21:11:27","1","2021-09-06 02:40:01","2020-09-25 18:50:24"),
(24,3,33,"interdum","P.O. Box 873, 1312 In Avenue","erat neque non quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque neque sed sem egestas blandit. Nam nulla magna, malesuada vel,","2020-03-22 17:28:36","2020-12-10 16:38:40","0","2021-05-31 17:30:31","2021-07-25 22:36:57"),
(25,3,92,"eu","288-4899 Nisi Av.","tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus","2020-02-28 12:08:07","2020-07-05 01:54:11","0","2021-12-01 17:01:20","2021-02-23 23:00:56"),
(26,3,49,"egestas","647-7968 Arcu St.","et risus. Quisque libero lacus, varius et, euismod et, commodo at, libero. Morbi accumsan","2020-01-24 08:16:15","2021-02-19 21:50:43","0","2021-04-25 15:58:14","2020-07-02 09:25:54"),
(27,3,86,"malesuada","Ap #930-5117 Mauris St.","penatibus et","2020-01-30 05:17:53","2021-07-06 06:24:05","0","2022-04-08 14:58:49","2020-07-29 05:09:15"),
(28,3,51,"ut","7154 Rutrum. Av.","odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim","2020-05-04 09:29:32","2020-10-30 21:38:44","1","2020-12-26 18:29:33","2020-11-25 21:35:30"),
(29,1,58,"lobortis","3371 Sollicitudin St.","morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque neque sed sem","2020-02-19 10:04:27","2021-04-24 23:58:53","0","2020-07-15 16:52:56","2021-04-29 04:44:33"),
(30,3,76,"rhoncus","4201 Purus Av.","Aenean sed pede nec ante blandit viverra. Donec tempus, lorem fringilla ornare placerat, orci lacus vestibulum lorem, sit amet ultricies sem magna nec","2020-04-25 22:51:32","2020-08-16 03:38:17","1","2020-08-12 10:36:39","2021-11-25 09:58:16"),
(31,3,35,"ipsum","P.O. Box 776, 5179 Tortor, Street","vehicula risus.","2020-01-16 01:26:07","2021-07-01 18:02:20","0","2022-02-05 22:46:26","2021-05-28 10:22:11"),
(32,1,66,"Integer","4280 Neque Av.","pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia. Sed congue, elit sed consequat auctor, nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse","2020-05-14 17:28:37","2020-07-07 14:05:34","1","2021-07-18 22:48:42","2022-03-02 04:52:14"),
(33,1,66,"posuere,","Ap #294-3379 Erat Ave","id, blandit at, nisi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl. Quisque fringilla","2020-05-19 13:02:17","2021-04-17 04:33:44","0","2021-06-01 16:31:32","2022-01-24 02:48:18"),
(34,1,64,"urna","5160 Dolor. Rd.","eget metus eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero","2020-05-31 10:53:51","2020-07-17 07:28:10","0","2020-10-07 12:00:15","2022-02-24 02:56:47"),
(35,2,70,"orci.","P.O. Box 797, 6660 Ac Avenue","Aliquam fringilla cursus purus.","2020-03-06 10:40:45","2020-10-18 11:09:24","0","2021-02-04 20:50:29","2021-03-22 15:36:45"),
(36,1,81,"eleifend","1338 Ante. Rd.","ac tellus. Suspendisse sed dolor. Fusce","2020-01-16 23:47:46","2020-12-07 14:57:04","1","2022-01-26 18:43:39","2020-12-28 03:04:19"),
(37,3,30,"pharetra,","P.O. Box 461, 8455 Et Ave","at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum","2020-03-19 19:12:39","2021-06-13 23:20:09","1","2022-06-04 21:46:17","2021-11-14 06:51:35"),
(38,2,61,"enim.","392-7611 Pharetra. St.","tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi","2020-04-19 21:55:49","2020-12-10 17:42:49","1","2021-04-08 09:13:46","2022-06-10 15:24:58");


-- attendees isnert
INSERT IGNORE INTO attendees
(user_id, event_id, last_update, created_date)
values
('1', '1', '2021-07-04 11:32:20', '2021-07-04 10:00:00'),
('2', '1', '2021-07-04 11:32:20', '2021-07-04 10:00:00'),
('3', '1', '2021-07-04 11:32:20', '2021-07-04 10:00:00'),
('1', '2', '2021-07-04 11:32:20', '2021-07-04 10:00:00'),
('2', '2', '2021-07-04 11:32:20', '2021-07-04 10:00:00'),
('3', '3', '2021-07-04 11:32:20', '2021-07-04 10:00:00');