import Modal from '@mui/material/Modal'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Typography } from '@mui/material'

const CustomModal = ({ open = () => {}, onClose = () => {}, heading, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 'auto',
          borderRadius: '10px',
          overflow: 'visible',
          backgroundColor: '#EAEAEA',
          color: '#000'
        }}
      >
        <CardContent>{children}</CardContent>
      </Card>
    </Modal>
  )
}

export default CustomModal
