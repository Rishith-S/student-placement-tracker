app.get("/studentmarks",async(req,res)=>{
    const {clg,branch,rollno} = req.body;
    try {
        const college = await College.findOne({name:clg})
        if(!college)return res.status(404).send("no college found")
        
        let students;

        if(branch=="null" && rollno=="null"){
            students = await Student.find({college:college._id})
            const avg = students.reduce((avg,curr)=>avg+parseFloat(curr.marks),0.0)
            res.status(200).json({
                clg:clg,
                avg:(avg/students.length)
            })
        }
        else if(branch!="null" && rollno=="null"){
            students = await Student.find({college:college._id,branch:branch})
            const avg = students.reduce((avg,curr)=>avg+parseFloat(curr.marks),0.0)
            res.status(200).json({
                clg:clg,
                avg:(avg/students.length)
            })
        }
        else if(branch==null && rollno!="null"){
            students = await Student.findOne({college:college._id,branch:branch})
            res.status(200).json({
                clg:clg,
                avg:students.marks
            })
        }
        else{
            students = await Student.findOne({college:college._id,branch:branch,rollno:rollno})
            res.status(200).json({
                clg:clg,
                avg:students.marks
            })
        }
    } catch (error) {
        res.status(404).send(error)
    }
})
