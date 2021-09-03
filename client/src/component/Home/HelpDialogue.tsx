import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle, 
  DialogActions,
  Slide,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';


const Transition = React.forwardRef(
  function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any>},
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />
})

export function HelpDialogue() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const DialogComponent = () => (
    <>
      <Dialog
        open={open}
        keepMounted
        TransitionComponent={Transition}
      >
        <DialogTitle>Help/Guide Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, ipsum ab! A corporis quos sunt animi eaque itaque? Quas pariatur consequuntur alias maxime error similique autem dolor sunt deleniti iusto.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )

  return ({
    handleClickOpen,
    element: <DialogComponent />
  })
}