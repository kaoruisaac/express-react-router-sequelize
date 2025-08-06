import PopUpWindow from "~/components/PopUpWindow";
import { forwardPopup } from "~/containers/PopUp/PopUpProvider";
import { Styled } from 'remix-component-css-loader';
import { useTranslation } from "react-i18next";
import { Button } from "@heroui/react";


const NotifyPopUp = forwardPopup(({ message, title, onConfirm } : { message: string, title?: string, onConfirm?: () => void }, popup) => {
    const { t } = useTranslation();
    return (
    <Styled>
        <PopUpWindow PopUp={popup} header={title || t('notify')}>
            <section>
                {message}
            </section>
            <footer>
                <Button variant="bordered" onPress={popup.close}>{t('close')}</Button>
                {
                    onConfirm && (
                        <Button onPress={async () => { await onConfirm(); popup.close() }}>{t('ok')}</Button>
                    )
                }
            </footer>
        </PopUpWindow>
    </Styled>
    )
});

export default NotifyPopUp;