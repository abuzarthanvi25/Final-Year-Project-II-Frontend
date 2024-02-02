import { Button, Chip, Typography } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import MemberDetailsSmall from '../search-users/member-component-sm';
import { useFormik } from 'formik';
import { CircularProgress, TextField } from '@mui/material';
import { AddChatInitialValues, AddChatValidationSchema } from '@/utils/validations/chat-validations';
import useEffectOnce from '@/hooks/useEffectOnce';

const AddChat = ({friends = [], previousData = null, loading = false, handleAddChat = () => {}}) => {

    const formik = useFormik({
        initialValues: AddChatInitialValues,
        validationSchema: AddChatValidationSchema,
        onSubmit: values => {
            handleAddChat(values);
        }
    })

    useEffectOnce(() => {
        if(previousData){
          formik.setFieldValue('members', previousData?.members);
          formik.setFieldValue('name', previousData?.name || '');
        }
      })

      const handleAddMember = (_id) => {
        formik.setValues({
            ...formik.values,
            members: [...formik.values.members, _id],
        });
    };

    const handleRemoveMember = (_id) => {
        formik.setValues({
            ...formik.values,
            members: formik.values.members.filter((memberId) => memberId !== _id),
        });
    };

    const isAlreadyAdded = (_id) => {
        if (!_id) return false;
    
        return formik.values?.members?.includes(_id)
    };

    const handleMembers = (id) => {
        if(!id) return

        if(isAlreadyAdded(id)){
            handleRemoveMember(id)
        }else{
            handleAddMember(id)
        }
    }

    const handleGetMemberName = (id) => {
        if(!id) return

        return friends.find((friend) => friend._id == id)?.full_name
    }

  return (
    <div style={{ width: '600px' }}>
        <Typography className='text-xl text-center'>Add Chat Members</Typography>

    <form onSubmit={formik.handleSubmit}>
        <div className='flex flex-wrap mb-1'>
                {
                    formik.values?.members?.map((id) => (<Chip key={id} variant='ghost' className='w-fit my-1 mx-1' value={handleGetMemberName(id)} />))
                }
            </div>
            
        {
            formik.values.members.length > 1 && (
              <TextField
                required
                type="text"
                size='small'
                label="Group Name"
                {...formik.getFieldProps('name')}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                className="w-full my-2"
              />
            )
        }
            
        {
            friends?.map(({ _id, email, full_name, profile_picture }, i) => (
                <MemberDetailsSmall
                    key={i}
                    email={email}
                    handleAddMember={() => handleMembers(_id)}
                    full_name={full_name}
                    profile_picture={profile_picture?.url}
                    isAlreadyAdded={isAlreadyAdded(_id)}
                />
            ))
        }

            <div className='flex justify-center'>
                <Button size='lg' disabled={loading} type='submit' className="mt-3">
                        {loading ? <CircularProgress size={16} style={{ color: 'white' }} /> : previousData ? "Edit Chat" : "Add Chat"}
                </Button>
            </div>
    </form>
</div>
  )
}

export default AddChat;
