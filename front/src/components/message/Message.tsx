import styles from "components/message/Message.module.css";
import React from "react";

type Props = {
    children: React.ReactNode;
};

function Message({ children }: Props) {
    return <p className={styles.message}>{children}</p>;
}

export default Message;
