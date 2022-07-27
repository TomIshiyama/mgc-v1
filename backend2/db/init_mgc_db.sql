create database if not exists mgc;

use mgc;

DROP TABLE IF EXISTS events,attendees,users;
DROP TABLE IF EXISTS category_code_master,categories;

CREATE TABLE IF NOT EXISTS category_code_master (
    code VARCHAR(30) NOT NULL,
    PRIMARY KEY (code)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS division_code_master (
    code VARCHAR(255) NOT NULL,
    PRIMARY KEY (code)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

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
    icon_path VARCHAR(255),
    icon_name VARCHAR(255),
    description TEXT,
    theme VARCHAR(255) NOT NULL,
    is_admin TINYINT NOT NULL,
    is_stop TINYINT NOT NULL,
    last_update TIMESTAMP NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    CONSTRAINT fk_division_code
        FOREIGN KEY (division)
        REFERENCES division_code_master (code)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS categories (
    id TINYINT AUTO_INCREMENT NOT NULL,
    category_code VARCHAR(30) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_category_code
        FOREIGN KEY (category_code)
        REFERENCES category_code_master (code)
) ENGINE=INNODB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS events (
    id INTEGER AUTO_INCREMENT NOT NULL,
    user_id INTEGER NOT NULL,
    category_id TINYINT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    detail TEXT,
    begin TIMESTAMP NOT NULL,
    end TIMESTAMP NOT NULL,
    is_temporary TINYINT NOT NULL,
    last_update TIMESTAMP NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    created_date TIMESTAMP NOT NULL default CURRENT_TIMESTAMP,
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
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, event_id)
)
ENGINE=INNODB DEFAULT CHARSET=utf8;

-- user isnert
INSERT IGNORE INTO USERS
(id, given_name, family_name, given_kana, family_kana, email, password, division, position, icon_path, icon_name, description, theme, is_admin, is_stop, last_update)
VALUES
('1', 'Satori', 'Sato', 'Satori', 'Sato', 'satou@test.com', '123456', 'yokohama', 'Division Director', 'dummmypath/path/icon', 'dummyIcon', 'just a discription', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('2', 'Yumi', 'Nishimoto', 'Yumi', 'Nishimoto', 'nishimoto@test.com', '123456', 'yokohama', 'Division Director', 'dummmypath/path/icon2', 'dummyIcon2', 'just a discription 2', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('3', 'Kana', 'Yoko', 'Kana', 'Yoko', 'kano@test.com', '123456', 'yokohama', 'Unit Director', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('4', 'Tom', 'Stone', 'Tom', 'Stone', 'tom@test.com', '123456', 'yokohama', 'Unit Director', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('5', 'てすと', 'まん', 'テスト', 'マン', 'testman@test.com', '123456', 'yokohama', 'Division Director', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('6', '承太郎', '空条', 'ジョウタロウ', 'クウジョウ', 'tester1@test.com', '123456', 'yokohama', 'Unit Director', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('7', 'Joseph', 'Joestar', 'ジョウタロウ', 'クウジョウ', 'tester2@test.com', '123456', 'yokohama', 'Unit Director', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('8', 'Muhammad', 'Avdol', 'ムハンマド', 'アブドゥル', 'tester3@test.com', '123456', 'yokohama', 'Unit Director', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('9', '典明', '花京院', 'ノリアキ', 'カキョウイン', 'tester4@test.com', '123456', 'yokohama', 'Unit Director', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('10', 'Jean', 'Polnareff', 'ジャン', 'ポルナレフ2世', 'tester5@test.com', '123456', 'tokyo', 'Group Director', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('11', 'Jean', 'Polnareff', 'ジャン', 'ポルナレフ3世', 'tester6@test.com', '123456', 'tokyo', 'Group Director', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('12', 'Jean', 'Polnareff', 'ジャン', 'ポルナレフ4世', 'tester7@test.com', '123456', 'tokyo', 'Group Director', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('13', 'Jean', 'Polnareff', 'ジャン', 'ポルナレフ5世', 'tester8@test.com', '123456', 'tokyo', 'Group Director', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('14', 'Jean', 'Polnareff', 'ジャン', 'ポルナレフ6世', 'tester9@test.com', '123456', 'tokyo', 'Group Director', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('15', 'Jean', 'Polnareff', 'ジャン', 'ポルナレフ7世', 'tester10@test.com', '123456', 'tokyo', 'Group Director', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('16', 'Jean', 'Polnareff', 'ジャン', 'ポルナレフ8世', 'tester11@test.com', '123456', 'tokyo', 'Member', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('17', 'Jean', 'Polnareff', 'ジャン', 'ポルナレフ9世', 'tester12@test.com', '123456', 'tokyo', 'Member', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('18', 'Jean', 'Polnareff', 'ジャン', 'ポルナレフ10世', 'tester13@test.com', '123456', 'tokyo', 'Member', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('19', 'Jean', 'Polnareff', 'ジャン', 'ポルナレフ11世', 'tester14@test.com', '123456', 'nagoya', 'Member', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('20', 'Jean', 'Polnareff', 'ジャン', 'ポルナレフ12世', 'tester15@test.com', '123456', 'nagoya', 'Member', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('21', 'Jean', 'Polnareff', 'ジャン', 'ポルナレフ13世', 'tester16@test.com', '123456', 'nagoya', 'Member', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('22', 'Jean', 'Polnareff', 'ジャン', 'ポルナレフ14世', 'tester17@test.com', '123456', 'yokohama', 'Member', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('23', 'Jean', 'Polnareff', 'ジャン', 'ポルナレフ15世', 'tester18@test.com', '123456', 'yokohama', 'Member', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('24', 'Jean', 'Polnareff', '1郎', '田中', 'tester19@test.com', '123456', 'yokohama', 'Member', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('25', 'Jean', 'Polnareff', '2郎', '田中2', 'tester20@test.com', '123456', 'yokohama', 'Member', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('26', 'Jean', 'Polnareff', '3郎', '田中3', 'tester21@test.com', '123456', 'yokohama', 'Member', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('27', 'Jean', 'Polnareff', '4郎', '田中4', 'tester22@test.com', '123456', 'yokohama', 'Member', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('28', 'Jean', 'Polnareff', '5郎', '田中5', 'tester23@test.com', '123456', 'yokohama', 'Member', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('29', 'Jean', 'Polnareff', '6郎', '田中6', 'tester24@test.com', '123456', 'yokohama', 'Member', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('30', 'Jean', 'Polnareff', '7郎', '田中7', 'tester25@test.com', '123456', 'yokohama', 'Member', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('31', 'Jean', 'Polnareff', '8郎', '田中8', 'tester26@test.com', '123456', 'yokohama', 'Member', 'dummmypath/path/icon3', 'dummyIcon3', 'just a discription 3', 'normal', '0', '0', '2022-07-04 10:32:20 '),
('32', 'hoge', 'fuga', 'ほげ', 'ふが', 'hoge@example.com', '$2b$10$ytl8gRyJkz4Nu0GyVN5rOerCqnyIYrwdLLNJ4epqQs1oHNnYJIydS', 'yokohama', 'Member', null, null, null, 'normal', '1', '0', '2022-07-04 10:32:20 ');

-- category_code_master insert
INSERT IGNORE INTO category_code_master (code) VALUES ("fff"),("meeting"),("tech"),("meetup"),("primary"),("anniversary"),("etc"),("temporary");

INSERT IGNORE INTO division_code_master (code) VALUES ("tokyo"),("yokohama"),("nagoya"),("fukuoka"),("hokkaido");

-- categories insert
INSERT IGNORE INTO categories (id,category_code,name) VALUES (1,"fff","FFF"),(2,"meeting","会議"),(3,"tech","技術"),(4,"meetup","交流"),(5,"primary","重要"),(6,"anniversary","設立記念日"),(7,"etc","その他"),(8,"temporary","仮登録");
-- (5,"laoreet, libero et"),(6,"cursus vestibulum. Mauris"),(7,"erat, eget tincidunt"),(8,"sed libero. Proin"),(9,"lorem, luctus ut,"),(10,"aliquet, sem ut"),(11,"eu turpis. Nulla"),(12,"libero dui nec"),(13,"cursus non, egestas"),(14,"natoque penatibus et"),(15,"primis in faucibus"),(16,"eget, dictum placerat,"),(17,"Cum sociis natoque"),(18,"at sem molestie"),(19,"tortor, dictum eu,"),(20,"Sed dictum. Proin"),(21,"Mauris non dui"),(22,"Etiam ligula tortor,"),(23,"consectetuer rhoncus. Nullam"),(24,"dictum mi, ac"),(25,"ac nulla. In"),(26,"orci tincidunt adipiscing."),(27,"malesuada id, erat."),(28,"erat. Vivamus nisi."),(29,"massa. Quisque porttitor"),(30,"Cras dolor dolor,"),(31,"iaculis quis, pede."),(32,"fermentum risus, at"),(33,"et ultrices posuere"),(34,"euismod et, commodo"),(35,"enim non nisi."),(36,"Donec sollicitudin adipiscing"),(37,"dictum augue malesuada"),(38,"eget nisi dictum"),(39,"sodales at, velit."),(40,"vulputate ullamcorper magna."),(41,"pede, ultrices a,"),(42,"vel quam dignissim"),(43,"eu erat semper"),(44,"Aliquam adipiscing lobortis"),(45,"ligula. Aenean euismod"),(46,"tortor nibh sit"),(47,"vitae erat vel"),(48,"Suspendisse commodo tincidunt"),(49,"Maecenas mi felis,"),(50,"porta elit, a"),(51,"elit elit fermentum"),(52,"Morbi sit amet"),(53,"erat neque non"),(54,"montes, nascetur ridiculus"),(55,"Aliquam nec enim."),(56,"nisi sem semper"),(57,"mollis. Phasellus libero"),(58,"ultrices posuere cubilia"),(59,"enim, condimentum eget,"),(60,"convallis erat, eget"),(61,"ligula. Aenean euismod"),(62,"posuere cubilia Curae;"),(63,"placerat. Cras dictum"),(64,"in magna. Phasellus"),(65,"consequat purus. Maecenas"),(66,"sapien, gravida non,"),(67,"placerat. Cras dictum"),(68,"at sem molestie"),(69,"eget ipsum. Suspendisse"),(70,"Aliquam fringilla cursus"),(71,"arcu et pede."),(72,"nec, diam. Duis"),(73,"vehicula aliquet libero."),(74,"consectetuer adipiscing elit."),(75,"leo elementum sem,"),(76,"mollis vitae, posuere"),(77,"Aenean egestas hendrerit"),(78,"Fusce aliquet magna"),(79,"velit in aliquet"),(80,"hendrerit neque. In"),(81,"eu nibh vulputate"),(82,"mus. Aenean eget"),(83,"nec metus facilisis"),(84,"a nunc. In"),(85,"vel sapien imperdiet"),(86,"auctor, velit eget"),(87,"egestas, urna justo"),(88,"egestas. Aliquam fringilla"),(89,"magna sed dui."),(90,"Duis sit amet"),(91,"nisi magna sed"),(92,"Suspendisse ac metus"),(93,"risus. In mi"),(94,"Donec sollicitudin adipiscing"),(95,"ipsum ac mi"),(96,"dis parturient montes,"),(97,"ac mattis velit"),(98,"nisi dictum augue"),(99,"dui. Fusce diam"),(100,"eu sem. Pellentesque");

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
https://alhinc.workplace.com/groups/483609602459852/permalink/932638967556911/","2022-01-01 01:52:26","2022-01-01 03:12:36","0","2022-11-05 19:45:49","2022-11-15 13:57:05"),
(2,1,1,"lorem","1553 Dui. Rd.","in, hendrerit consectetuer, cursus et,","2022-02-10 02:07:34","2022-02-10 13:25:32","0","2022-11-01 06:45:55","2022-02-10 10:58:20"),
(3,3,2,"nisl","Ap #563-1753 Et St.","Morbi neque tellus, imperdiet non, vestibulum nec, euismod in,","2022-04-27 16:28:54","2022-04-28 22:52:37","1","2022-01-09 08:34:08","2022-11-28 10:08:10"),
(4,2,3,"ridiculus","273-4517 Faucibus. St.","egestas nunc sed libero. Proin sed turpis nec mauris blandit mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros non enim","2022-05-20 01:14:49","2022-05-20 10:14:49","1","2020-09-23 14:10:14","2020-09-25 13:20:33"),
(5,3,2,"magna","Ap #137-8776 Quisque Av.","eu augue porttitor interdum. Sed auctor odio","2022-01-25 13:31:11","2022-01-25 14:41:40","0","2022-10-11 17:14:25","2022-03-24 16:11:01"),
(6,2,4,"Lorem","P.O. Box 819, 7472 Volutpat. Rd.","quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc","2020-02-21 04:54:29","2020-08-22 14:50:06","0","2022-04-13 20:53:42","2022-05-29 10:14:50"),
(7,1,6,"penatibus","Ap #596-8492 Vitae St.","vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam","2022-05-21 01:14:49","2022-05-22 01:14:49","1","2022-06-21 14:58:52","2022-09-13 14:36:44"),
(8,2,6,"at,","688-8961 Risus. Street","ut eros non enim commodo hendrerit. Donec porttitor","2022-01-24 05:09:18","2022-01-24 11:57:37","1","2022-01-17 14:42:11","2022-04-23 07:14:24"),
(9,2,3,"elementum","Ap #111-9004 Consectetuer St.","dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum","2022-06-07 04:07:13","2022-06-07 04:07:13","1","2020-12-12 14:46:32","2022-12-05 07:54:43"),
(10,2,5,"amet","P.O. Box 772, 1171 Adipiscing Rd.","mi enim, condimentum eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida nunc sed pede. Cum sociis natoque penatibus et magnis dis parturient montes,","2022-05-22 01:14:49","2022-05-23 01:14:49","1","2020-09-05 10:54:45","2022-05-26 00:18:30"),
(11,2,6,"Donec","441-9954 Montes, Rd.","Sed congue,","2022-06-25 21:33:00","2022-06-25 21:33:00","1","2022-06-10 01:28:14","2022-04-20 18:16:00"),
(12,2,3,"pulvinar","P.O. Box 578, 2432 Et, Rd.","leo, in lobortis tellus justo sit amet nulla. Donec non justo. Proin non massa non ante bibendum ullamcorper. Duis","2022-03-05 13:04:28","2022-03-05 13:04:28","0","2020-07-15 03:33:22","2022-01-02 11:34:15"),
(13,4,6,"adipiscing","Ap #838-7409 Consectetuer, St.","tellus id nunc interdum feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet odio. Etiam ligula tortor, dictum eu, placerat eget, venenatis","2022-03-05 13:04:28","2022-03-05 13:04:28","1","2022-12-12 12:49:58","2022-04-16 22:47:22"),
(14,5,5,"per","Ap #826-9410 Aliquam Ave","Sed eu nibh vulputate mauris sagittis placerat.","2022-05-23 01:14:49","2022-05-23 03:14:49","0","2020-10-26 04:34:13","2022-03-11 11:01:53"),
(15,6,1,"tincidunt","P.O. Box 866, 2148 Aptent St.","quam quis diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce aliquet magna a neque. Nullam ut nisi a odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu.","2022-03-09 22:43:17","2022-03-09 22:43:17","0","2022-12-30 13:06:57","2020-10-03 22:05:08"),
(16,6,3,"libero.","Ap #675-2731 Imperdiet Ave","ridiculus mus. Aenean","2022-05-18 16:53:58","2022-05-18 17:53:58","1","2020-10-04 22:22:48","2020-10-14 19:45:50"),
(17,5,3,"ipsum.","Ap #928-6994 Donec Av.","Maecenas malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut lacus. Nulla tincidunt, neque vitae semper egestas, urna justo faucibus lectus, a sollicitudin orci sem eget","2022-02-10 12:44:05","2022-02-10 14:36:36","1","2022-12-08 21:25:43","2022-04-03 20:38:13"),
(18,5,4,"dui.","555-7711 Morbi Avenue","Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare","2022-05-16 12:26:12","2022-05-16 14:26:12","1","2020-07-01 02:41:54","2022-10-24 09:02:14"),
(19,5,2,"Aliquam","Ap #648-2321 Nulla St.","pede sagittis augue, eu tempor erat neque non quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque neque sed sem","2022-03-01 13:28:27","2022-03-01 15:28:27","1","2022-03-10 09:52:51","2022-02-20 23:01:47"),
(20,1,2,"quam","Ap #877-718 Dui. Avenue","nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi sit amet massa. Quisque porttitor eros nec tellus. Nunc lectus pede,","2022-11-01 08:48:53","2022-11-02 08:48:53","0","2022-01-10 22:17:45","2022-09-25 03:31:13"),
(21,2,1,"lectus","Ap #332-3728 Nam Av.","vitae mauris sit amet lorem semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus. In mi pede, nonummy ut, molestie in,","2022-02-15 10:07:22","2022-02-15 14:07:22","1","2022-08-27 22:56:15","2022-03-28 05:23:39"),
(22,4,1,"magna","Ap #164-5544 Sem Avenue","eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida nunc sed pede. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.","2022-05-30 20:55:09","2022-05-30 20:55:09","0","2020-10-12 18:59:39","2022-09-13 02:34:16"),
(23,4,2,"mauris,","P.O. Box 733, 6389 Nulla Avenue","tristique pellentesque, tellus sem mollis dui, in sodales elit","2022-03-07 19:11:27","2022-03-07 21:11:27","1","2022-09-06 02:40:01","2020-09-25 18:50:24"),
(24,4,3,"interdum","P.O. Box 873, 1312 In Avenue","erat neque non quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque neque sed sem egestas blandit. Nam nulla magna, malesuada vel,","2022-12-10 16:38:40","2022-12-10 16:38:40","0","2022-05-31 17:30:31","2022-07-25 22:36:57"),
(25,4,2,"eu","288-4899 Nisi Av.","tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus","2022-07-05 01:54:11","2022-07-05 01:54:11","0","2022-12-01 17:01:20","2022-02-23 23:00:56"),
(26,3,4,"egestas","647-7968 Arcu St.","et risus. Quisque libero lacus, varius et, euismod et, commodo at, libero. Morbi accumsan","2022-05-19 21:50:43","2022-05-19 21:50:43","0","2022-04-25 15:58:14","2020-07-02 09:25:54"),
(27,3,6,"malesuada","Ap #930-5117 Mauris St.","penatibus et","2022-07-06 03:24:05","2022-07-06 06:24:05","0","2022-04-08 14:58:49","2020-07-29 05:09:15"),
(28,3,1,"ut","7154 Rutrum. Av.","odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim","2022-07-07 03:24:05","2022-07-07 06:24:05","1","2020-12-26 18:29:33","2020-11-25 21:35:30"),
(29,1,7,"lobortis","3371 Sollicitudin St.","morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque neque sed sem","2022-07-08 03:24:05","2022-07-08 06:24:05","0","2020-07-15 16:52:56","2022-04-29 04:44:33"),
(30,3,7,"rhoncus","4201 Purus Av.","Aenean sed pede nec ante blandit viverra. Donec tempus, lorem fringilla ornare placerat, orci lacus vestibulum lorem, sit amet ultricies sem magna nec","2022-07-09 03:24:05","2022-07-09 06:24:05","1","2020-08-12 10:36:39","2022-11-25 09:58:16"),
(31,3,8,"ipsum","P.O. Box 776, 5179 Tortor, Street","vehicula risus.","2022-07-12 03:24:05","2022-07-12 06:24:05","0","2022-02-05 22:46:26","2022-05-28 10:22:11"),
(32,1,3,"Integer","4280 Neque Av.","pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia. Sed congue, elit sed consequat auctor, nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse","2022-07-12 03:24:05","2022-07-12 06:24:05","1","2022-07-18 22:48:42","2022-03-02 04:52:14"),
(33,2,7,"enim.","392-7611 Pharetra. St.","<h3>これはタイトルのテスト</h3><strong>太字のテスト</strong></br>aaaaaaaaa </br>ああああああああああああああああ","2022-07-13 03:24:05","2022-07-14 06:24:05","1","2022-04-08 09:13:46","2022-06-10 15:24:58"),
(34,1,1,"ファンファンファミリー","Zoom on line meeting","【ZoomURL】
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
https://alhinc.workplace.com/groups/483609602459852/permalink/932638967556911/","2022-08-01 01:52:26","2022-08-01 03:12:36","0","2022-11-05 19:45:49","2022-11-15 13:57:05"),
(35,1,1,"ファンファンファミリー","Zoom on line meeting","【ZoomURL】
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
https://alhinc.workplace.com/groups/483609602459852/permalink/932638967556911/","2022-09-27 01:52:26","2022-09-27 03:12:36","0","2022-11-05 19:45:49","2022-11-15 13:57:05");


-- attendees isnert
INSERT IGNORE INTO attendees
(user_id, event_id, last_update, created_date)
values
('1', '1', '2022-07-04 11:32:20', '2022-07-04 10:00:00'),
('2', '1', '2022-07-04 11:32:20', '2022-07-04 10:00:00'),
('3', '1', '2022-07-04 11:32:20', '2022-07-04 10:00:00'),
('1', '2', '2022-07-04 11:32:20', '2022-07-04 10:00:00'),
('2', '2', '2022-07-04 11:32:20', '2022-07-04 10:00:00'),
('3', '3', '2022-07-04 11:32:20', '2022-07-04 10:00:00');
