const professional=require('../models/professional')
const bcrypt=require('bcrypt')
const postsignup=async(req,res)=>{
    try {
       
        const imageFile = req.files['image'][0];
        const photoFile = req.files['photo'][0];
      
       
        let userexsist=await professional.findOne({email:req.body.email})
        if(userexsist){
            res.status(400).json({message:"Email already taken"})
        }else{
            let hashpassword=await bcrypt.hash(req.body.password,10)
            let result=new professional({
                name:req.body.name,
                ownername:req.body.ownername,
                phone:req.body.phone,
                email:req.body.email,
                password:hashpassword,
                place:req.body.place,           
                certificate:imageFile.filename,
                photo:photoFile.filename 
              })
              await result.save()
              res.status(200).json({
                  message:"success"
              })

        }
        

        
    } catch (error) {
        console.log(error)
    }
   

    

}
const postlogin=async(req,res)=>{
    try {
        let data=req.body
        console.log(data);
        let userData=await professional.findOne({email:req.body.email})
        console.log(userData);
        if(userData){

            if (!(await bcrypt.compare(req.body.password, userData.password))) {

                return res.status(400).send({ message: "Invalid user name or password" })
            }else{
                if(!userData.blocked){
                    if(userData.isVerified){
                        res.json({message:"success"})
                    }else{
                        return res.status(400).json({message:"You are not Verified by admin"})
                    }

                }else{
                    return res.status(400).json({message:"User is blocked"})
                }
            }

        }else{
            res.status(400).json({
                message:"user doesn't exsist"
            })
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports={
    postsignup,
    postlogin
  
}