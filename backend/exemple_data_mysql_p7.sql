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


-- topicmess_id, topicmess_parent, topicmess_titre, topicmess_content, topicmess_posting_date, topicmess_user_id, topicmess_picture_url
INSERT INTO topic_messages (topicmess_id, topicmess_parent, topicmess_titre, topicmess_content, topicmess_posting_date, topicmess_user_id, topicmess_picture_url)
VALUES
(...),
(...);