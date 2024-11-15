const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 8080;

// Middleware لتفسير الجسم (body) كـ JSON
app.use(express.json());

// إعداد اتصال MongoDB
const uri = "mongodb+srv://bosyahmad3005:27071977@cluster0.ma1nflp.mongodb.net/";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tlsAllowInvalidCertificates: true // السماح بالشهادات غير الصالحة
});

// إضافة CORS كوسيط
app.use(cors());

// فتح اتصال MongoDB لمرة واحدة عند بدء الخادم
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// دالة لإضافة طالب جديد
app.post('/addstudent', async (req, res) => {
  try {
    const database = client.db("Mr");
    const collection = database.collection("student");

    // الحصول على آخر id موجود
    const lastStudent = await collection.findOne({}, { sort: { id: -1 } });
    const newId = lastStudent ? lastStudent.id + 1 : 1; // زيادة id بمقدار 1 أو بدء من 1 إذا لم يوجد طلاب

    const newStudent = {
      id: newId,
      name: req.body.name,
      phoneparent: req.body.phoneparent,
      phonestudent: req.body.phonestudent,
      grade: req.body.grade,
      center: req.body.center,
      date: new Date() // إضافة التاريخ والوقت الحالي
    };

    await collection.insertOne(newStudent);
    res.status(201).json({ message: 'تم إضافة الطالب بنجاح', student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ أثناء إضافة الطالب', error: error.message });
  }
});

// دالة لإضافة طالب إلى prep1
// دالة لإضافة عدة طلاب إلى prep1
app.post('/prep1', async (req, res) => {
  try {
    const database = client.db("Mr");
    const collection = database.collection("prep1");

    // استخراج البيانات المشتركة والطلاب من جسم الطلب
    const { date, grade, center, students } = req.body;

    // إضافة grade و center و Exam و Attendance و Homework إلى كل طالب
    const studentsWithAdditionalData = students.map((student) => ({
      ...student,
      grade: grade || null,
      center: center || null,
      Exam: student.Exam || null,
      Attendance: student.Attendance || null,
      Homework: student.Homework || null,
    }));

    // تكوين وثيقة البيانات للإدخال
    const document = {
      date: date ? new Date(date) : new Date(),
      grade: grade || null,
      center: center || null,
      students: studentsWithAdditionalData,
    };

    // إدخال الوثيقة إلى قاعدة البيانات
    await collection.insertOne(document);

    res.status(201).json({ message: 'تم إضافة البيانات بنجاح إلى prep1', data: document });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ أثناء إضافة البيانات إلى prep1', error: error.message });
  }
});


// دالة لإضافة عدة طلاب إلى prep2
app.post('/prep2', async (req, res) => {
  try {
    const database = client.db("Mr");
    const collection = database.collection("prep2");

    // استخراج البيانات المشتركة والطلاب من جسم الطلب
    const { date, grade, center, students } = req.body;

    // إضافة grade و center و Exam و Attendance و Homework إلى كل طالب
    const studentsWithAdditionalData = students.map((student) => ({
      ...student,
      grade: grade || null,
      center: center || null,
      Exam: student.Exam || null,
      Attendance: student.Attendance || null,
      Homework: student.Homework || null,
    }));

    // تكوين وثيقة البيانات للإدخال
    const document = {
      date: date ? new Date(date) : new Date(),
      grade: grade || null,
      center: center || null,
      students: studentsWithAdditionalData,
    };

    // إدخال الوثيقة إلى قاعدة البيانات
    await collection.insertOne(document);

    res.status(201).json({ message: 'تم إضافة البيانات بنجاح إلى prep1', data: document });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ أثناء إضافة البيانات إلى prep1', error: error.message });
  }
});


// دالة لإضافة عدة طلاب إلى prep3
app.post('/prep3', async (req, res) => {
  try {
    const database = client.db("Mr");
    const collection = database.collection("prep3");

    // استخراج البيانات المشتركة والطلاب من جسم الطلب
    const { date, grade, center, students } = req.body;

    // إضافة grade و center و Exam و Attendance و Homework إلى كل طالب
    const studentsWithAdditionalData = students.map((student) => ({
      ...student,
      grade: grade || null,
      center: center || null,
      Exam: student.Exam || null,
      Attendance: student.Attendance || null,
      Homework: student.Homework || null,
    }));

    // تكوين وثيقة البيانات للإدخال
    const document = {
      date: date ? new Date(date) : new Date(),
      grade: grade || null,
      center: center || null,
      students: studentsWithAdditionalData,
    };

    // إدخال الوثيقة إلى قاعدة البيانات
    await collection.insertOne(document);

    res.status(201).json({ message: 'تم إضافة البيانات بنجاح إلى prep1', data: document });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ أثناء إضافة البيانات إلى prep1', error: error.message });
  }
});


// دالة لإضافة مجموعة من الطلاب
app.post('/addStudents', async (req, res) => {
  try {
    const database = client.db("Mr");
    const collection = database.collection("student");

    // إضافة التاريخ والوقت الحالي لكل طالب
    const studentsWithDate = req.body.map(student => ({
      ...student,
      date: new Date() // إضافة التاريخ والوقت الحالي
    }));

    await collection.insertMany(studentsWithDate);
    res.status(201).json({ message: 'تم إضافة الطلاب بنجاح', students: studentsWithDate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ أثناء إضافة الطلاب', error: error.message });
  }
});

// دالة لاسترجاع جميع الطلاب
app.get('/', async (req, res) => {
  try {
    const database = client.db("Mr");
    const collection = database.collection("student");
    const students = await collection.find({}).toArray();

    if (students.length) {
      res.json(students);
    } else {
      res.status(404).send("لا يوجد طلاب");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get('/showprep3', async (req, res) => {
  try {
    const database = client.db("Mr");
    const collection = database.collection("prep3");
    const students = await collection.find({}).toArray();

    if (students.length) {
      res.json(students);
    } else {
      res.status(404).send("لا يوجد طلاب");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get('/showprep2', async (req, res) => {
  try {
    const database = client.db("Mr");
    const collection = database.collection("prep2");
    const students = await collection.find({}).toArray();

    if (students.length) {
      res.json(students);
    } else {
      res.status(404).send("لا يوجد طلاب");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get('/showprep1', async (req, res) => {
  try {
    const database = client.db("Mr");
    const collection = database.collection("prep1");
    const students = await collection.find({}).toArray();

    if (students.length) {
      res.json(students);
    } else {
      res.status(404).send("لا يوجد طلاب");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get('/showprep1/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // التأكد من أن id له طول 24 حرفًا للتأكد من أنه ObjectId صحيح
    if (id.length !== 24) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const objectId = new ObjectId(id);
    const database = client.db('Mr');
    const collection = database.collection('prep1');

    // البحث عن المستند باستخدام ObjectId
    const result = await collection.findOne({ _id: objectId });

    if (!result) {
      return res.status(404).json({ error: 'No document found with this ID' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});
app.get('/showprep2/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // التأكد من أن id له طول 24 حرفًا للتأكد من أنه ObjectId صحيح
    if (id.length !== 24) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const objectId = new ObjectId(id);
    const database = client.db('Mr');
    const collection = database.collection('prep2');

    // البحث عن المستند باستخدام ObjectId
    const result = await collection.findOne({ _id: objectId });

    if (!result) {
      return res.status(404).json({ error: 'No document found with this ID' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});
app.get('/showprep3/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // التأكد من أن id له طول 24 حرفًا للتأكد من أنه ObjectId صحيح
    if (id.length !== 24) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const objectId = new ObjectId(id);
    const database = client.db('Mr');
    const collection = database.collection('prep3');

    // البحث عن المستند باستخدام ObjectId
    const result = await collection.findOne({ _id: objectId });

    if (!result) {
      return res.status(404).json({ error: 'No document found with this ID' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// بدء الخادم
app.listen(port, () => console.log(`Listening to port ${port}`));
