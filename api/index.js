const express = require('express')
const College = require('../api/college')
const Student = require('../api/student')
const Branch  = require('../api/branch')
const cors = require('cors')
require('../api/db')

const app = express()

const port = 5000;
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};
    
app.use(allowCrossDomain);
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: true}));

app.post('/studentdetails', async(req,res)=>{
    const {clg,branch,rollno} = req.body
    try {
        const cl = await College.findOne({name:clg});
        const br = await Branch.findOne({name:branch});
        if(!cl)return res.status(404).send('no college found')
        let students
        if(branch=='' && rollno=='')students = await Student.find({college:cl._id})
        else if(branch!='' && rollno == '')students = await Student.find({college:cl._id,branch:br._id})
        else if(branch=='' && rollno != '')students = await Student.find({college:cl._id,rollno:rollno})
        else students = await Student.find({college:cl._id,branch:br._id,rollno:rollno})
        // console.log(students) 
        const updatedStudents = [];
        for (const item of students) {
            const b = await Branch.findOne({ _id: item.branch });
            // console.log(b)
            item.college = cl.name
            item.branch = b.name;
            updatedStudents.push(item);
        }
        // console.log(updatedStudents) 
        res.status(200).json({ student: updatedStudents });

    } catch (error) {
        res.status(404).send(error)
    }
})



app.post("/college",async (req,res)=>{
    const {name} = req.body;
    
    try {
        const col = await College.findOne({name:name})
        if(!col){
            const newcoll = new College({
                name:name
            });
            const x = newcoll.save()
            // console.log(x)
            res.status(200).json({data:newcoll})
        }
        else{
            res.status(202).send("college exists")
        }
    } catch (error) {
        res.status(500).json({error:error})
    }
})

app.post("/branch",async(req,res)=>{
    const {branch} = req.body;
    // console.log(branch)
    const br = await Branch.findOne({name:branch})
    // console.log(br)
    if(br){
        return res.status(200).send("branch already exists")
    }
    const newcoll = new Branch({
        name:branch
    });
    try {
        const x = newcoll.save()
        res.status(200).json({data:newcoll})
    } catch (error) {
        res.status(500).json({error:error})
    }
})

app.post("/students", async (req,res)=>{
    const {clg,studname,marks,branch,placement,rollno} = req.body
    try{
        console.log(clg,studname,marks,branch,placement,rollno)
        const college = await College.findOne({name:clg})
        const r = await Student.findOne({college:college._id,rollno:rollno})
        const br = await Branch.findOne({name:branch})
        if(!college){
            return res.status(404).send("College not found");
        }
        if(!br){
            return res.status(404).send("Branch not found");
        }
        if(r==null){
            const newstud =  new Student({
                name:studname,
                college:college._id,
                marks:marks,
                branch:br._id,
                placement:placement,
                rollno:rollno
            })

            newstud.save()
            res.status(200).json({status:"success"})

        }
        else{
            const newstud =  new Student({
                _id:r._id,
                name:studname,
                college:college._id,
                marks:marks,
                branch:br._id,
                placement:placement,
                rollno:rollno
            })
            Student.updateOne({_id:r._id},newstud).then(()=>{res.status(200).json({status:"updated"})})
        }
        
    }
    catch(err){
        res.status(404).json({err:err})
    }

})

app.post("/deletestudent",async (req,res)=>{
    const {clg,studname,rollno} = req.body
    try {
        // console.log(clg)
        const college = await College.findOne({name:clg})
        // console.log(college)
        await Student.findOneAndRemove({college:college._id, name:studname, rollno:rollno });
        res.send("successfully deleted")
    } catch (error) {   
        res.status(404).send(error);
    }
})

app.listen(port, () => console.log(`App running on port ${port}`));