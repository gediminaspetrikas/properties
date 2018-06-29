-- Referenced https://stackoverflow.com/questions/12563706/is-there-a-mysql-option-feature-to-track-history-of-changes-to-records

CREATE TABLE maker.property_history LIKE maker.property;

ALTER TABLE maker.property_history MODIFY COLUMN id int(36) NOT NULL,
   DROP PRIMARY KEY, ENGINE = MyISAM, ADD action VARCHAR(8) DEFAULT 'insert' FIRST,
   ADD revision INT(6) NOT NULL AUTO_INCREMENT AFTER action,
   ADD dt_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER revision,
   ADD PRIMARY KEY (id, revision);

   DROP TRIGGER IF EXISTS maker.property__ai;
   DROP TRIGGER IF EXISTS maker.property__au;
   DROP TRIGGER IF EXISTS maker.property__bd;

   CREATE TRIGGER maker.property__ai AFTER INSERT ON maker.property FOR EACH ROW
       INSERT INTO maker.property_history SELECT 'insert', NULL, NOW(), d.*
       FROM maker.property AS d WHERE d.id = NEW.id;

   CREATE TRIGGER maker.property__au AFTER UPDATE ON maker.property FOR EACH ROW
       INSERT INTO maker.property_history SELECT 'update', NULL, NOW(), d.*
       FROM maker.property AS d WHERE d.id = NEW.id;

   CREATE TRIGGER maker.property__bd BEFORE DELETE ON maker.property FOR EACH ROW
       INSERT INTO maker.property_history SELECT 'delete', NULL, NOW(), d.*
       FROM maker.property AS d WHERE d.id = OLD.id;