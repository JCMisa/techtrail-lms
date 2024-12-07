import TeacherCourses from "./_components/TeacherCourses";
import TeacherInfo from "./_components/TeacherInfo";

const TeacherProfile = ({ params }: { params: { teacherId: number } }) => {
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <TeacherInfo teacherId={params?.teacherId} />
        <div className="col-span-2">
          <TeacherCourses teacherId={params?.teacherId} />
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
