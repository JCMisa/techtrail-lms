/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowBigUpDash, Clock, Hash, SquarePlay } from "lucide-react";
import { UserInputContext } from "../_context/UserInputContext";

const SelectOption = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (name: string, value: string) => {
    setUserCourseInput((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <div className="flex flex-row items-center gap-1 my-2">
            <ArrowBigUpDash className="w-5 h-5" />
            <label className="text-sm">Course Difficulty</label>
          </div>
          <Select
            onValueChange={(value) => handleInputChange("level", value)}
            defaultValue={userCourseInput?.level}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner" className="cursor-pointer">
                Beginner
              </SelectItem>
              <SelectItem value="Intermediate" className="cursor-pointer">
                Intermediate
              </SelectItem>
              <SelectItem value="Advance" className="cursor-pointer">
                Advance
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="flex flex-row items-center gap-1 my-2">
            <Clock className="w-5 h-5" />
            <label className="text-sm">Course Duration</label>
          </div>
          <Select
            onValueChange={(value) => handleInputChange("duration", value)}
            defaultValue={userCourseInput?.duration}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour" className="cursor-pointer">
                1 Hour
              </SelectItem>
              <SelectItem value="2 Hours" className="cursor-pointer">
                2 Hours
              </SelectItem>
              <SelectItem value="2+ Hours" className="cursor-pointer">
                More than 2 Hours
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="flex flex-row items-center gap-1 my-2">
            <SquarePlay className="w-5 h-5" />
            <label className="text-sm">Add Video?</label>
          </div>
          <Select
            onValueChange={(value) => handleInputChange("displayVideo", value)}
            defaultValue={userCourseInput?.displayVideo}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes" className="cursor-pointer">
                Yes
              </SelectItem>
              <SelectItem value="no" className="cursor-pointer">
                No
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="flex flex-row items-center gap-1">
            <Hash className="w-5 h-5" />
            <label className="text-sm my-2">No. of Chapters</label>
          </div>
          <Input
            type={"number"}
            onChange={(e) => handleInputChange("chapters", e.target.value)}
            defaultValue={userCourseInput?.chapters}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectOption;
