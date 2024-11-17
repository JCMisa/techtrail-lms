import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const LeaveCourseReview = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-5">
      {/* message */}
      some message here...
      {/* form */}
      <div className="post-card-rev flex flex-col gap-3 shadow-lg">
        <textarea placeholder="What can you say about this course?"></textarea>
        <hr className="hr-rev" />
        <div className="button-row-rev flex items-center gap-5" id="first">
          <button className="upload-rev">👍🏻</button>
          <button className="live-video-rev">❤</button>
          <button className="life-event-rev">👎🏻</button>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={true}
            onCheckedChange={(value) => console.log(value)}
            // checked={initialData && initialData?.isFree}
            // onCheckedChange={(value) => onSubmit(value)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to share my information with this website.
          </label>
        </div>
        <Button className="w-full">Submit</Button>
      </div>
    </div>
  );
};

export default LeaveCourseReview;
