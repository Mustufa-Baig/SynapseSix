import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Plus, FileText, Calendar, BookOpen, Users, GraduationCap, Search, Download, Eye, PlayCircle, Home, Info, ClipboardList, FolderOpen, Brain } from 'lucide-react';
import logoImage from '@assets/generated_images/RiskMap_educational_logo_design_caf18436.png';
import mentorImage from '@assets/generated_images/Female_teacher_mentor_portrait_d925f9f7.png';
import studentImage from '@assets/generated_images/Male_student_profile_portrait_28875416.png';

// Dummy data for all components
//todo: remove mock functionality - Attendance data for line chart
const attendanceData = [
  { month: 'Jan', attendance: 92 },
  { month: 'Feb', attendance: 88 },
  { month: 'Mar', attendance: 94 },
  { month: 'Apr', attendance: 87 },
  { month: 'May', attendance: 90 },
  { month: 'Jun', attendance: 85 }
];

//todo: remove mock functionality - Overall attendance donut chart data
const overallAttendanceData = [
  { name: 'Present', value: 88, fill: 'hsl(var(--chart-2))' },
  { name: 'Absent', value: 12, fill: 'hsl(var(--chart-4))' }
];

//todo: remove mock functionality - Assignment pie chart data
const assignmentData = [
  { name: 'Submitted', value: 15, fill: 'hsl(var(--chart-2))' },
  { name: 'Pending', value: 5, fill: 'hsl(var(--chart-3))' },
  { name: 'Graded', value: 12, fill: 'hsl(var(--chart-1))' }
];

//todo: remove mock functionality - Progress bar chart data
const progressData = [
  { subject: 'Math', progress: 85 },
  { subject: 'Science', progress: 92 },
  { subject: 'English', progress: 78 },
  { subject: 'History', progress: 88 }
];

//todo: remove mock functionality - Grades stepped line chart data
const gradesData = [
  { month: 'Jan', grade: 85 },
  { month: 'Feb', grade: 82 },
  { month: 'Mar', grade: 88 },
  { month: 'Apr', grade: 90 },
  { month: 'May', grade: 87 },
  { month: 'Jun', grade: 92 }
];

//todo: remove mock functionality - At-risk students data
const atRiskStudents = [
  { id: 'S001', name: 'John Smith', course: 'Computer Science', year: '2024', attendance: 65, gpa: 2.1, riskLevel: 'HIGH', trendData: [75, 70, 65, 62, 58] },
  { id: 'S002', name: 'Emma Johnson', course: 'Mathematics', year: '2023', attendance: 78, gpa: 2.8, riskLevel: 'MEDIUM', trendData: [80, 78, 76, 78, 79] },
  { id: 'S003', name: 'Michael Brown', course: 'Physics', year: '2024', attendance: 92, gpa: 3.8, riskLevel: 'LOW', trendData: [90, 91, 92, 91, 92] }
];

//todo: remove mock functionality - Timetable data
const timetableData = [
  { time: '9:00 AM', monday: 'Mathematics', tuesday: 'Physics', wednesday: 'Chemistry', thursday: 'Biology', friday: 'English' },
  { time: '10:00 AM', monday: 'Physics', tuesday: 'Chemistry', wednesday: 'Biology', thursday: 'Mathematics', friday: 'History' },
  { time: '11:00 AM', monday: 'Chemistry', tuesday: 'Biology', wednesday: 'English', thursday: 'Physics', friday: 'Geography' },
  { time: '12:00 PM', monday: 'Biology', tuesday: 'English', wednesday: 'Mathematics', thursday: 'Chemistry', friday: 'Art' },
  { time: '2:00 PM', monday: 'English', tuesday: 'Mathematics', wednesday: 'Physics', thursday: 'History', friday: 'Physical Ed' }
];

//todo: remove mock functionality - Assignments data
const assignments = [
  { name: 'Math Assignment 1', dueDate: '2024-01-15', status: 'Done', statusColor: 'bg-green-500' },
  { name: 'Physics Lab Report', dueDate: '2024-01-20', status: 'Pending', statusColor: 'bg-yellow-500' },
  { name: 'Chemistry Project', dueDate: '2024-01-10', status: 'Expired', statusColor: 'bg-red-500' }
];

//todo: remove mock functionality - Class recordings data
const classRecordings = [
  { date: '2024-01-10', topic: 'Advanced Calculus', duration: '1h 30m' },
  { date: '2024-01-08', topic: 'Organic Chemistry Basics', duration: '1h 45m' },
  { date: '2024-01-05', topic: 'Physics Laws', duration: '2h 00m' }
];

//todo: remove mock functionality - Documents data
const documents = [
  { name: 'AADHAAR Card', icon: FileText },
  { name: 'PAN Card', icon: FileText },
  { name: 'Vaccine Certificate', icon: FileText },
  { name: 'Academic Transcript', icon: GraduationCap },
  { name: 'Birth Certificate', icon: FileText },
  { name: 'Address Proof', icon: FileText }
];

//todo: remove mock functionality - Strengths data for donut charts
const strengthsData = {
  maths: [{ name: 'Performance', value: 85, fill: 'hsl(var(--chart-1))' }, { name: 'Remaining', value: 15, fill: 'hsl(var(--muted))' }],
  science: [{ name: 'Performance', value: 92, fill: 'hsl(var(--chart-2))' }, { name: 'Remaining', value: 8, fill: 'hsl(var(--muted))' }],
  english: [{ name: 'Performance', value: 78, fill: 'hsl(var(--chart-3))' }, { name: 'Remaining', value: 22, fill: 'hsl(var(--muted))' }]
};

// Mini line chart component for sparklines
const SparklineChart = ({ data }: { data: number[] }) => {
  const chartData = data.map((value, index) => ({ index, value }));
  return (
    <ResponsiveContainer width={80} height={30}>
      <LineChart data={chartData}>
        <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Risk level badge component
const RiskBadge = ({ level }: { level: string }) => {
  const colors = {
    HIGH: 'bg-red-500 text-white',
    MEDIUM: 'bg-blue-500 text-white',
    LOW: 'bg-green-500 text-white'
  };
  return (
    <Badge className={`${colors[level as keyof typeof colors]} px-3 py-1 rounded-full`}>
      {level}
    </Badge>
  );
};

export default function RiskMap() {
  const [currentPage, setCurrentPage] = useState('login');
  const [userType, setUserType] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  const handleLogin = () => {
    alert('User logged in successfully!');
    setCurrentPage('dashboard');
  };

  const handleSignUp = () => {
    alert('Sign up functionality - New user registration!');
  };

  // Navigation component
  const Sidebar = () => (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <img src={logoImage} alt="RiskMap Logo" className="w-8 h-8 rounded-md" />
          <h2 className="text-xl font-semibold text-sidebar-foreground">RiskMap</h2>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Button
          variant={currentPage === 'dashboard' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentPage('dashboard')}
          data-testid="link-dashboard"
        >
          <Home className="mr-2 h-4 w-4" />
          Student Dashboard
        </Button>
        <Button
          variant={currentPage === 'classinfo' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentPage('classinfo')}
          data-testid="link-classinfo"
        >
          <Info className="mr-2 h-4 w-4" />
          Class Info
        </Button>
        <Button
          variant={currentPage === 'classdashboard' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentPage('classdashboard')}
          data-testid="link-classdashboard"
        >
          <Users className="mr-2 h-4 w-4" />
          Class Dashboard
        </Button>
        <Button
          variant={currentPage === 'documents' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentPage('documents')}
          data-testid="link-documents"
        >
          <FolderOpen className="mr-2 h-4 w-4" />
          Document Locker
        </Button>
        <Button
          variant={currentPage === 'counselor' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentPage('counselor')}
          data-testid="link-counselor"
        >
          <Brain className="mr-2 h-4 w-4" />
          Digital Counselor
        </Button>
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setCurrentPage('login')}
          data-testid="button-logout"
        >
          Logout
        </Button>
      </div>
    </div>
  );

  // Top navigation bar
  const TopNavbar = () => (
    <div className="h-16 bg-card border-b border-card-border flex items-center justify-between px-6 ml-64">
      <h1 className="text-2xl font-semibold text-card-foreground">
        {currentPage === 'dashboard' && 'Student Dashboard'}
        {currentPage === 'classinfo' && 'Class Info'}
        {currentPage === 'classdashboard' && 'At-Risk Students'}
        {currentPage === 'documents' && 'Documents'}
        {currentPage === 'counselor' && 'Digital Counselor'}
      </h1>
      <div className="flex items-center space-x-4">
        <Avatar data-testid="img-avatar">
          <AvatarImage src={studentImage} />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <span className="text-sm text-card-foreground">John Smith</span>
      </div>
    </div>
  );

  // Login page component
  if (currentPage === 'login') {
    return (
      <div className="min-h-screen bg-muted flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                <img src={logoImage} alt="RiskMap Logo" className="w-16 h-16 rounded-md" data-testid="img-logo" />
              </div>
              <CardTitle className="text-2xl font-semibold text-card-foreground">
                RiskMap Login
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  data-testid="input-username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="input-password"
                />
              </div>
              <div className="space-y-3">
                <Label>User Type</Label>
                <RadioGroup value={userType} onValueChange={setUserType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parent" id="parent" data-testid="radio-parent" />
                    <Label htmlFor="parent">Parent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" data-testid="radio-student" />
                    <Label htmlFor="student">Student</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-3">
                <Button className="w-full" onClick={handleLogin} data-testid="button-login">
                  Login
                </Button>
                <Button variant="ghost" onClick={handleSignUp} data-testid="button-signup">
                  Sign Up (New User)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <footer className="h-12 bg-muted-foreground text-muted text-xs flex items-center justify-center">
          <div className="text-center">
            A Product For Educational Institute By RiskMap Inc. | Updated On: {new Date().toLocaleDateString()}
          </div>
        </footer>
      </div>
    );
  }

  // Student Dashboard page
  if (currentPage === 'dashboard') {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <TopNavbar />
        <main className="ml-64 pt-16 p-6">
          {/* Student Info Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16" data-testid="img-student-avatar">
                  <AvatarImage src={studentImage} />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-semibold text-card-foreground" data-testid="text-student-name">John Smith</h3>
                  <p className="text-muted-foreground" data-testid="text-student-info">Student ID: S12345 | Grade 12 | Computer Science</p>
                  <p className="text-muted-foreground" data-testid="text-student-email">john.smith@school.edu</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Attendance Line Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Attendance (6 Months)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="attendance" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Overall Attendance Donut */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={overallAttendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {overallAttendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center mt-2">
                  <p className="text-2xl font-bold text-card-foreground" data-testid="text-attendance-percentage">88%</p>
                  <p className="text-sm text-muted-foreground">Present</p>
                </div>
              </CardContent>
            </Card>

            {/* Assignments Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ClipboardList className="mr-2 h-5 w-5" />
                  Assignments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={assignmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {assignmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Grade Prediction */}
            <Card>
              <CardHeader>
                <CardTitle>Grade Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-primary" data-testid="text-predicted-grade">A-</div>
                  <p className="text-muted-foreground">Predicted Final Grade</p>
                  <div className="space-y-1 text-sm">
                    <p data-testid="text-grade-confidence">Confidence: 87%</p>
                    <p data-testid="text-grade-trend" className="text-green-500">↑ Improving</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Subject Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="progress" fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Grades Stepped Line Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Grade Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={gradesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="step" dataKey="grade" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Current Grade */}
            <Card>
              <CardHeader>
                <CardTitle>Current Grade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-primary" data-testid="text-current-grade">B+</div>
                  <p className="text-muted-foreground">Overall GPA: 3.7</p>
                  <div className="space-y-1 text-sm">
                    <p data-testid="text-grade-rank">Class Rank: 15/120</p>
                    <p data-testid="text-credits">Credits: 18/24</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* View Grade-books Section */}
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>Academic Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {['2024', '2023', '2022', '2021'].map((year) => (
                    <Card key={year} className="border border-card-border">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg" data-testid={`text-year-${year}`}>{year} Report</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => alert(`Viewing ${year} report`)}
                          data-testid={`button-view-${year}`}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => alert(`Downloading ${year} report`)}
                          data-testid={`button-download-${year}`}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Class Info page
  if (currentPage === 'classinfo') {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <TopNavbar />
        <main className="ml-64 pt-16 p-6 space-y-6">
          {/* Time Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Weekly Timetable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Monday</TableHead>
                      <TableHead>Tuesday</TableHead>
                      <TableHead>Wednesday</TableHead>
                      <TableHead>Thursday</TableHead>
                      <TableHead>Friday</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timetableData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium" data-testid={`text-time-${index}`}>{row.time}</TableCell>
                        <TableCell data-testid={`text-monday-${index}`}>{row.monday}</TableCell>
                        <TableCell data-testid={`text-tuesday-${index}`}>{row.tuesday}</TableCell>
                        <TableCell data-testid={`text-wednesday-${index}`}>{row.wednesday}</TableCell>
                        <TableCell data-testid={`text-thursday-${index}`}>{row.thursday}</TableCell>
                        <TableCell data-testid={`text-friday-${index}`}>{row.friday}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Assignments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ClipboardList className="mr-2 h-5 w-5" />
                  Assignments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.map((assignment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-card-border rounded-md">
                      <div>
                        <h4 className="font-medium" data-testid={`text-assignment-name-${index}`}>{assignment.name}</h4>
                        <p className="text-sm text-muted-foreground" data-testid={`text-assignment-due-${index}`}>Due: {assignment.dueDate}</p>
                      </div>
                      <Badge className={`${assignment.statusColor} text-white`} data-testid={`badge-assignment-status-${index}`}>
                        {assignment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mentor Details */}
            <Card>
              <CardHeader>
                <CardTitle>Class Mentor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16" data-testid="img-mentor-avatar">
                    <AvatarImage src={mentorImage} />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-lg" data-testid="text-mentor-name">Sarah Mitchell</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p data-testid="text-mentor-phone">📞 +1 (555) 123-4567</p>
                      <p data-testid="text-mentor-email">📧 sarah.mitchell@school.edu</p>
                      <p data-testid="text-mentor-school">🏫 Lincoln High School</p>
                      <p data-testid="text-mentor-department">Department: Computer Science</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Class Recordings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlayCircle className="mr-2 h-5 w-5" />
                Class Recordings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {classRecordings.map((recording, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-card-border rounded-md hover-elevate">
                    <div>
                      <h4 className="font-medium" data-testid={`text-recording-topic-${index}`}>{recording.topic}</h4>
                      <p className="text-sm text-muted-foreground" data-testid={`text-recording-date-${index}`}>
                        {recording.date} • {recording.duration}
                      </p>
                    </div>
                    <Button 
                      onClick={() => alert(`Watching: ${recording.topic}`)}
                      data-testid={`button-watch-recording-${index}`}
                    >
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Watch
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Class Dashboard page
  if (currentPage === 'classdashboard') {
    const filteredStudents = atRiskStudents.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.course.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRisk = riskFilter === 'all' || student.riskLevel === riskFilter;
      return matchesSearch && matchesRisk;
    });

    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <TopNavbar />
        <main className="ml-64 pt-16 p-6 space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, ID, or course..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      data-testid="input-search-students"
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select value={riskFilter} onValueChange={setRiskFilter}>
                    <SelectTrigger data-testid="select-risk-filter">
                      <SelectValue placeholder="Filter by Risk Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk Levels</SelectItem>
                      <SelectItem value="HIGH">High Risk</SelectItem>
                      <SelectItem value="MEDIUM">Medium Risk</SelectItem>
                      <SelectItem value="LOW">Low Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Students Overview Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Students Overview ({filteredStudents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Info</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>GPA</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium" data-testid={`text-student-name-${index}`}>{student.name}</div>
                            <div className="text-sm text-muted-foreground" data-testid={`text-student-id-${index}`}>{student.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium" data-testid={`text-student-course-${index}`}>{student.course}</div>
                            <div className="text-sm text-muted-foreground" data-testid={`text-student-year-${index}`}>{student.year}</div>
                          </div>
                        </TableCell>
                        <TableCell data-testid={`text-student-attendance-${index}`}>{student.attendance}%</TableCell>
                        <TableCell>
                          <SparklineChart data={student.trendData} />
                        </TableCell>
                        <TableCell data-testid={`text-student-gpa-${index}`}>{student.gpa}</TableCell>
                        <TableCell>
                          <RiskBadge level={student.riskLevel} />
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            onClick={() => alert(`Viewing details for ${student.name}`)}
                            data-testid={`button-view-details-${index}`}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Document Locker page
  if (currentPage === 'documents') {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <TopNavbar />
        <main className="ml-64 pt-16 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {documents.map((doc, index) => (
              <Card 
                key={index} 
                className="hover-elevate cursor-pointer transition-all duration-200"
                onClick={() => alert(`Opening ${doc.name}`)}
                data-testid={`card-document-${index}`}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-muted rounded-lg flex items-center justify-center">
                    <doc.icon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-card-foreground" data-testid={`text-document-name-${index}`}>{doc.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Floating Action Button */}
          <Button
            size="icon"
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg"
            onClick={() => alert('Add new document functionality')}
            data-testid="button-add-document"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </main>
      </div>
    );
  }

  // Digital Counselor page
  if (currentPage === 'counselor') {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <TopNavbar />
        <main className="ml-64 pt-16 p-6 space-y-6">
          {/* Your Strengths */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(strengthsData).map(([subject, data], index) => (
                  <Card key={subject} className="border border-card-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg capitalize" data-testid={`text-strength-${subject}`}>{subject}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                          <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={60}
                            dataKey="value"
                          >
                            {data.map((entry, idx) => (
                              <Cell key={`cell-${idx}`} fill={entry.fill} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="text-center mt-2">
                        <p className="text-2xl font-bold text-card-foreground" data-testid={`text-strength-percentage-${subject}`}>
                          {data[0].value}%
                        </p>
                        <p className="text-sm text-muted-foreground">Performance</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Market Demands */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">In Demand Careers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'Data Science & Analytics',
                    'Artificial Intelligence',
                    'Cybersecurity',
                    'Cloud Computing',
                    'Digital Marketing',
                    'Healthcare Technology'
                  ].map((career, index) => (
                    <div key={index} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                      <p className="text-green-700 dark:text-green-300" data-testid={`text-demand-career-${index}`}>{career}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Declining Fields</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'Traditional Print Media',
                    'Manual Data Entry',
                    'Basic Assembly Line Work',
                    'Travel Agencies',
                    'Traditional Banking Roles',
                    'Physical Video/DVD Rental'
                  ].map((field, index) => (
                    <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                      <p className="text-red-700 dark:text-red-300" data-testid={`text-declining-field-${index}`}>{field}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Best Options For You */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                Best Career Options For You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Data Science', match: '95%', reason: 'Strong math and analytical skills' },
                  { title: 'Software Engineering', match: '89%', reason: 'Excellent programming aptitude' },
                  { title: 'Machine Learning', match: '87%', reason: 'High performance in statistics' },
                  { title: 'Research Analyst', match: '82%', reason: 'Strong research and analysis skills' },
                  { title: 'Product Management', match: '78%', reason: 'Good communication and technical skills' },
                  { title: 'UX Design', match: '75%', reason: 'Creative problem-solving abilities' }
                ].map((option, index) => (
                  <Card key={index} className="border border-card-border">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-primary" data-testid={`text-career-option-${index}`}>{option.title}</h4>
                        <p className="text-2xl font-bold text-card-foreground" data-testid={`text-career-match-${index}`}>{option.match}</p>
                        <p className="text-sm text-muted-foreground" data-testid={`text-career-reason-${index}`}>{option.reason}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                By using our Digital Counselor service, you agree to our terms of service and privacy policy. 
                We collect and analyze your academic performance data to provide personalized career guidance. 
                Your data is kept confidential and is only used for improving our recommendation algorithms.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => alert('Terms accepted!')}
                  data-testid="button-accept-terms"
                >
                  Accept Terms & Cookies
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => alert('Terms rejected!')}
                  data-testid="button-reject-terms"
                >
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return null;
}