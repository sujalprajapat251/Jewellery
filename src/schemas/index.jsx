import * as Yup from 'yup'

export const LoginSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
});

export const ForgetPassSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});
  
export const OtpSchema = Yup.object({
    otp1: Yup.string()
      .required('Required')
      .matches(/^\d$/, 'Must be a single digit'),
    otp2: Yup.string()
      .required('Required')
      .matches(/^\d$/, 'Must be a single digit'),
    otp3: Yup.string()
      .required('Required')
      .matches(/^\d$/, 'Must be a single digit'),
    otp4: Yup.string()
      .required('Required')
      .matches(/^\d$/, 'Must be a single digit'),
});

export const ResetPassSchema = Yup.object({
    newPass: Yup.string()
      .required('New Password is required')
      .min(8, 'Password must be at least 8 characters'),
    //   .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    //   .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    //   .matches(/[0-9]/, 'Password must contain at least one number')
    //   .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
    
    conPass: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('newPass'), null], 'Passwords must match'),
});

export const EditProfileSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters long'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    gender: Yup.string()
      .required('Gender is required')
      .oneOf(['male', 'female'], 'Gender must be Male or Female'),
    dob: Yup.date()
      .required('Date of Birth is required')
      .max(new Date(), 'Date of Birth cannot be in the future'),
    pin: Yup.string()
      .required('Pin code is required')
      .matches(/^[0-9]{6}$/, 'Pin code must be exactly 6 digits'),
});

export const NewAddSchema = Yup.object({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(20, "Name must be less than or equal to 20 characters")
        .required("Enter Your Name"),

    address: Yup.string()
        .max(100, "Address must be less than or equal to 100 characters")
        .required("Address must be less than or equal to 100 characters"),
    
    pincode: Yup.string()
        .matches(/^\d{6}$/, "Pincode must be a 6-digit number")
        .required("Enter Your Pincode"),
    
    state: Yup.string()
        .required("Enter Your State"),
    
    city: Yup.string()
        .required("Enter Your City"),
    
    phone: Yup.string()
        .matches(/^\d{10}$/)
        .required("Enter Your Phone Number"),
});

export const ChangePass = Yup.object({
  Old_Pass: Yup.string()
    .required('Old password is required'),
  
  New_Pass: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters long'),
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .matches(/[0-9]/, 'Password must contain at least one number')
    // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  
  Con_Pass: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('New_Pass'), null], 'Passwords must match'),
});

export const ReturnOrderSchema = Yup.object({
  order_id: Yup.string().required('Order id is required').min(6 , 'OrderId must be at least 6 characters long'),
  reason:Yup.string().required("Reason is required"),
  phone: Yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),  
})
