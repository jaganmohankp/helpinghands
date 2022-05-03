CREATE TABLE users (
	user_id SERIAL NOT NULL,	
	username VARCHAR (255) NOT null UNIQUE,
	gender VARCHAR (255) NOT NULL,
	email VARCHAR (255) NOT NULL UNIQUE,
	password VARCHAR (255) NOT NULL,
	PRIMARY KEY (user_id)	
);

CREATE TABLE notifications (
	notify_id SERIAL NOT NULL,	
	donorname VARCHAR (255) NOT NULL,
	recievername VARCHAR (255) NOT NULL,
	itemname VARCHAR (255) NOT NULL ,
	imagepath VARCHAR (255) NOT NULL ,
	adminapproval VARCHAR (255) NOT null,
	status VARCHAR (255) NOT null,
	PRIMARY KEY (notify_id),
	FOREIGN KEY (donorname) REFERENCES users (username),
	FOREIGN KEY (recievername) REFERENCES users (username)
);

CREATE TABLE items (
	item_id SERIAL NOT NULL,	
	itemname VARCHAR (255) NOT NULL,
	itemtype VARCHAR (255) NOT NULL,
	mcat VARCHAR (255) NOT NULL,
	scat VARCHAR (255) NOT NULL,
	description VARCHAR (255) NOT NULL,
	imagepath VARCHAR (255) NOT NULL,
	donorname VARCHAR (255) NOT NULL,
	recievername VARCHAR (255) NOT NULL,
	itemaddress VARCHAR (255) NOT NULL,
	itemlocation  VARCHAR (255) NOT NULL,
	itemphone VARCHAR (255) NOT NULL,
	alluser VARCHAR (255) NOT NULL,
	adminapproval VARCHAR (255) NOT null,
	PRIMARY KEY (item_id),
	FOREIGN KEY (donorname) REFERENCES users (username),
	FOREIGN KEY (recievername) REFERENCES users (username)
);