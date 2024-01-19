
import { WeddingLayout } from '../layout/WeddingLayout';
import { GuestsView } from '../views';
import { useDispatch } from 'react-redux';

export const WeddingPage = () => {


  const dispatch = useDispatch ();

  return (

    <WeddingLayout>

      {
        <GuestsView /> //<-- Si active es false, se muestra el componente NothingSelectedView
      }


    {/* <IconButton
    onClick={ onClickNewGuest }
    size= 'large'
    disabled = { isSaving }
    sx={{ color: 'white', backgroundColor: 'error.main', ':hover': { backgroundColor: 'error.main', opacity: 0.9},
    position: 'fixed',
    right: 50,
    bottom: 50,
   }}
    >
      <AddOutlined sx= {{ fontSize: 30 }} />

    </IconButton> */}

    </WeddingLayout>
  )
}
