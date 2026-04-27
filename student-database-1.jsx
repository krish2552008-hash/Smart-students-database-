import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit, Eye, BarChart3, Users } from 'lucide-react';

export default function StudentDatabase() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@school.com', grade: 'A', gpa: 3.9, rollNo: '001', major: 'Computer Science', joinDate: '2023-09-01' },
    { id: 2, name: 'Bob Smith', email: 'bob@school.com', grade: 'B+', gpa: 3.6, rollNo: '002', major: 'Physics', joinDate: '2023-09-01' },
    { id: 3, name: 'Carol Davis', email: 'carol@school.com', grade: 'A-', gpa: 3.8, rollNo: '003', major: 'Mathematics', joinDate: '2023-09-05' },
    { id: 4, name: 'David Wilson', email: 'david@school.com', grade: 'B', gpa: 3.4, rollNo: '004', major: 'Chemistry', joinDate: '2023-09-08' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [filterGrade, setFilterGrade] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: 'A',
    gpa: '',
    rollNo: '',
    major: '',
    joinDate: new Date().toISOString().split('T')[0]
  });

  const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];
  const majors = ['Computer Science', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Engineering', 'Literature', 'History'];

  // Filter and sort students
  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.rollNo.includes(searchTerm);
      const matchesGrade = filterGrade === 'all' || student.grade === filterGrade;
      return matchesSearch && matchesGrade;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'gpa') return b.gpa - a.gpa;
      if (sortBy === 'grade') return grades.indexOf(a.grade) - grades.indexOf(b.grade);
      if (sortBy === 'rollNo') return a.rollNo.localeCompare(b.rollNo);
      return 0;
    });

  const handleAddStudent = () => {
    setEditingId(null);
    setFormData({
      name: '',
      email: '',
      grade: 'A',
      gpa: '',
      rollNo: '',
      major: 'Computer Science',
      joinDate: new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setEditingId(student.id);
    setFormData(student);
    setShowModal(true);
  };

  const handleSaveStudent = () => {
    if (!formData.name || !formData.email || !formData.gpa || !formData.rollNo) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId) {
      setStudents(students.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
    } else {
      setStudents([...students, { ...formData, id: Math.max(...students.map(s => s.id)) + 1 }]);
    }
    setShowModal(false);
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const avgGPA = (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2);
  const topStudent = students.reduce((max, s) => s.gpa > max.gpa ? s : max, students[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-8 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Student Database</h1>
          </div>
          <p className="text-blue-100">Manage and track student information efficiently</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold">{students.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-300" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-cyan-100 text-sm font-medium">Average GPA</p>
                <p className="text-3xl font-bold">{avgGPA}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-cyan-300" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-100 text-sm font-medium">Top Student</p>
                <p className="text-lg font-bold">{topStudent.name}</p>
                <p className="text-sm text-purple-200">GPA: {topStudent.gpa}</p>
              </div>
              <Eye className="w-8 h-8 text-purple-300" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8 shadow-lg border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, or roll no..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700 text-white pl-10 pr-4 py-2 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
            >
              <option value="name">Sort by Name</option>
              <option value="gpa">Sort by GPA (High to Low)</option>
              <option value="grade">Sort by Grade</option>
              <option value="rollNo">Sort by Roll No</option>
            </select>

            {/* Filter */}
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
            >
              <option value="all">All Grades</option>
              {grades.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            {/* Add Button */}
            <button
              onClick={handleAddStudent}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-2 rounded font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Add Student
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
          {filteredStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Roll No</th>
                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                    <th className="px-6 py-4 text-left font-semibold">Major</th>
                    <th className="px-6 py-4 text-center font-semibold">Grade</th>
                    <th className="px-6 py-4 text-center font-semibold">GPA</th>
                    <th className="px-6 py-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-700 transition">
                      <td className="px-6 py-4 text-white font-medium">{student.name}</td>
                      <td className="px-6 py-4 text-slate-300">{student.rollNo}</td>
                      <td className="px-6 py-4 text-slate-300">{student.email}</td>
                      <td className="px-6 py-4 text-slate-300">{student.major}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          student.grade.startsWith('A') ? 'bg-green-500/20 text-green-300' :
                          student.grade.startsWith('B') ? 'bg-blue-500/20 text-blue-300' :
                          student.grade.startsWith('C') ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {student.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-white font-semibold">{student.gpa}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="text-blue-400 hover:text-blue-300 mr-3 transition"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No students found. Try adjusting your filters or add a new student.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg shadow-2xl max-w-md w-full border border-slate-700">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-2xl font-bold">{editingId ? 'Edit Student' : 'Add New Student'}</h2>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Roll Number *"
                value={formData.rollNo}
                onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="GPA (0-4.0) *"
                step="0.1"
                min="0"
                max="4"
                value={formData.gpa}
                onChange={(e) => setFormData({...formData, gpa: parseFloat(e.target.value)})}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none"
              />
              <select
                value={formData.grade}
                onChange={(e) => setFormData({...formData, grade: e.target.value})}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none"
              >
                {grades.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <select
                value={formData.major}
                onChange={(e) => setFormData({...formData, major: e.target.value})}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none"
              >
                {majors.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <input
                type="date"
                value={formData.joinDate}
                onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="bg-slate-700 px-6 py-4 rounded-b-lg flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStudent}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded font-semibold transition"
              >
                {editingId ? 'Update' : 'Add'} Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}