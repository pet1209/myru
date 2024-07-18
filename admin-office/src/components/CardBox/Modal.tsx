import { mdiClose } from '@mdi/js';
import { ReactNode } from 'react';
import type { ColorButtonKey } from '../../interfaces';
import Button from '../Button';
import Buttons from '../Buttons';
import CardBox from '.';
import CardBoxComponentTitle from './Component/Title';
import OverlayLayer from '../OverlayLayer';

type Props = {
  title: string;
  buttonColor?: ColorButtonKey;
  buttonLabel?: string;
  isActive: boolean;
  children: ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
  showFooter?: boolean;
};

const CardBoxModal = ({
  title,
  buttonColor = 'info',
  buttonLabel = '',
  isActive,
  children,
  onConfirm,
  onCancel,
  showFooter = true,
}: Props) => {
  if (!isActive) {
    return null;
  }

  const footer = (
    <Buttons className="justify-end">
      {!!onCancel && <Button label="Cancel" color={buttonColor} outline onClick={onCancel} />}
      <Button label={buttonLabel} color={buttonColor} onClick={onConfirm} />
    </Buttons>
  );

  return (
    <OverlayLayer onClick={onCancel} className={onCancel ? 'cursor-pointer' : ''}>
      <CardBox
        className={`transition-transform shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50`}
        isModal
        footer={showFooter ? footer : null}
      >
        <CardBoxComponentTitle title={title}>
          {!!onCancel && (
            <Button icon={mdiClose} color="whiteDark" onClick={onCancel} small roundedFull />
          )}
        </CardBoxComponentTitle>

        <div className="space-y-3">{children}</div>
      </CardBox>
    </OverlayLayer>
  );
};

export default CardBoxModal;