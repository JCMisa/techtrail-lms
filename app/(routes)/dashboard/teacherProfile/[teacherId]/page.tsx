const TeacherProfile = ({ params }: { params: { teacherId: number } }) => {
  return (
    <div className="p-5">
      teacher id: {params?.teacherId ? params?.teacherId : "Undefined"}
    </div>
  );
};

export default TeacherProfile;
