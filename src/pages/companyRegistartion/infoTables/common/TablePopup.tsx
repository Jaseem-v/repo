import { DialogActions, DialogContent } from '@mui/material';
import * as React from 'react';
import { SubmitBtn } from 'src/components/ButtonSet';
import { StaffListPopup } from './TablePopupComponents';

export interface IAppProps {
  handleClose: () => void;
}

const TablePopup: React.FC<IAppProps> = ({ handleClose, children }) => {
  return (
    <div>
      <DialogContent >
        {children}
      </DialogContent>
      <DialogActions style={{ paddingTop: "0", display: "flex", justifyContent: "space-between" }}>
        <SubmitBtn
          color="inherit"
          onClick={handleClose}
          variant="outlined"
          size='small'
        >
          Cancel
        </SubmitBtn>
        <SubmitBtn
          color="primary"
          onClick={handleClose}
          variant="contained"
          size='small'
          type='submit'
        >
          Save
        </SubmitBtn>

      </DialogActions>
    </div>
  );
}
export default TablePopup