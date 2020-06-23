insert into Company(id,name,type , NIP, regon,krs,legal_form,phone,email,way_of_obtaining) values
  (1, 'aa','Firma' ,' 3946613557', '754301396','saga21r51','spółka akcyjna','815432394','nazwa@firma.pl','rekomendacja'),
  (2, 'ab','Firma' ,'2151251251', '87112242456','sdsagsdg1','spółka akcyjna','815432394','nazwa2@firma.pl','rekomendacja'),
  (3, 'b','Firma' ,'653634653643', '76061536749','s222222221','spółka z.o.o','22222222','nazwa3@firma.pl','rekomendacja'),
  (4, 'b','Firma' ,'27537473', '76061536749','s222222221','spółka z.o.o','22222222','nazwa4@firma.pl','rekomendacja'),
  (5, 'b','Firma' ,'22141241', '76061536749','s222222221','spółka cywilna','22222222','nazwa5@firma.pl','rekomendacja'),
  (6, 'b','Firma' ,'67474754', '76061536749','s222222221','spółka z.o.o','22222222','nazwa6@firma.pl','rekomendacja');
insert into Person(id,type,name,surname,pesel,phone,email,way_of_obtaining)values
(1,'Osoba fizyczna','Jan','Kowalski','78123153132',666116362,'person1@email.com','rekomendacja'),
(2,'Osoba fizyczna','Mariusz','Nowak','85123153132',754116362,'person2@email.com','strona www');
insert into Address(id,APARTMENT_NUMBER, BUILDING_NUMBER,CITY ,NAME ,STREET ,ZIP,COMPANY_ID  ) values
  (1,20,222,'Lublin',' Adres zamieszkania','Pomaranczowa','20-122',1),
  (2,3,12,'Warszawa',' Adres zamieszkania','Mickiewicza','22-333',2),
  (3,4,4,'Lodz',' Adres zamieszkania','Slowackiego','25-222',3),
  (4,11,55,'Warszawa',' Adres zamieszkania','Warszawska','21-322',4),
    (5,11,55,'Warszawa',' Adres zamieszkania','Warszawska','21-322',4);
insert into Employee(id,name,phone,position,surname,company_id,status) values
  (1,'Jan','605234562','analityk','Kowalski',1,1),
  (2,'Piotr','605234562','analityk','Konarski',2,1),
  (3,'Paweł','123456789','programista','Precel',3,0),
  (4,'Patryk','678123155','programista','Nowak',4,1),
  (5,'Marian','605234562','analityk','Polak',1,0);
