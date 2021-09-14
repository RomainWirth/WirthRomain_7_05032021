-- user_id, user_pseudo, user_email, user_password, user_level, user_registration_date,
INSERT INTO users (u_id, u_pseudo, u_email, u_password, u_level, u_registration_date)
VALUES
(1, 'pseudo_AAA', 'email_AAA@exemple.com', 'MDP_AAA', 1, CURRENT_TIMESTAMP),
(2, 'pseudo_BBB', 'email_BBB@exemple.com', 'MDP_BBB', 1, CURRENT_TIMESTAMP),
(3, 'pseudo_CCC', 'email_CCC@exemple.com', 'MDP_CCC', 1, CURRENT_TIMESTAMP),
(4, 'pseudo_DDD', 'email_DDD@exemple.com', 'MDP_DDD', 1, CURRENT_TIMESTAMP),
(5, 'pseudo_EEE', 'email_EEE@exemple.com', 'MDP_EEE', 1, CURRENT_TIMESTAMP),
(6, 'pseudo_FFF', 'email_FFF@exemple.com', 'MDP_FFF', 1, CURRENT_TIMESTAMP),
(7, 'pseudo_Admin', 'email_Admin@exemple.com', 'MDP_AAA', 0, CURRENT_TIMESTAMP);

-- update le niveau d'autorisation
UPDATE users SET u_level = 0 WHERE u_id = 7;

-- tm_id, tm_parent, tm_titre, tm_content, tm_posting_date, tm_user_id, tm_moderation, tm_picture_url
INSERT INTO topic_messages (tm_id, tm_parent, tm_titre, tm_content, tm_posting_date, tm_user_id, tm_moderation, tm_picture_url)
VALUES
(1, 0, 'titre n1', 'contenu texte numéro 1.0', CURRENT_TIMESTAMP, 1, 0, ''), -- topic n°1 - nouveau parent 0
(2, 1, 'titre n1', 'contenu texte numéro 1.1', CURRENT_TIMESTAMP, 2, 0, ''),
(3, 2, 'titre n1', 'contenu texte numéro 1.2', CURRENT_TIMESTAMP, 4, 0, ''),
(4, 3, 'titre n1', 'contenu texte numéro 1.3', CURRENT_TIMESTAMP, 6, 0, ''),
(5, 4, 'titre n1', 'contenu texte numéro 1.4', CURRENT_TIMESTAMP, 3, 0, ''),
(6, 0, 'titre n2', 'contenu texte numéro 2.0', CURRENT_TIMESTAMP, 6, 0, ''), -- topic n°2 - nouveau parent 0
(7, 6, 'titre n2', 'contenu texte numéro 2.1', CURRENT_TIMESTAMP, 1, 0, ''),
(8, 7, 'titre n2', 'contenu texte numéro 2.2', CURRENT_TIMESTAMP, 3, 0, ''),
(9, 8, 'titre n2', 'contenu texte numéro 2.3', CURRENT_TIMESTAMP, 2, 0, '');

-- update moderation
UPDATE topic_messages SET tm_moderation = 0  WHERE tm_id = 7;
-- -----------------


SELECT * FROM users;
SELECT * FROM topic_messages;

TRUNCATE TABLE users;
TRUNCATE TABLE topic_messages;

-- selection de tous les topics avec tri ascendant (ici 2 topics selon la table topic_messages de test)
SELECT tm_id, tm_titre, tm_posting_date 
FROM topic_messages 
WHERE tm_parent = 0
ORDER BY tm_posting_date DESC;

-- selection de tous les postes d'un user
SELECT tm.*, u.u_pseudo FROM topic_messages tm
INNER JOIN users u ON tm.tm_user_id = u.u_id
WHERE u.u_id = 1
ORDER BY tm.tm_id ASC;

-- selection de tous les messages dans une conversation
SELECT tm.*, u.u_pseudo FROM topic_messages tm
INNER JOIN users u ON tm.tm_user_id = u.u_id
WHERE tm.tm_titre = 'titre n1'
ORDER BY tm.tm_id ASC;