"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import UploadRoleRequestProof from "./UploadRoleRequestProof";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { LoaderCircleIcon } from "lucide-react";
import { filterUserByEmail } from "@/services/UserService";
import { askRoleChange } from "@/services/RoleChangeService";

const AskRoleChangeDialog = () => {
  const { user } = useUser();

  const [open, setOpen] = useState(false);
  const [requestedRoleReason, setRequestedRoleReason] = useState("");
  const [imageUrlProof, setImageUrlProof] = useState("");
  const [loading, setLoading] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState<{
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    imageUrl: string;
    createdAt: string;
    role: string;
  }>();

  const getLoggedInUserByEmail = async () => {
    try {
      setLoading(true);

      const result = await filterUserByEmail(
        user?.primaryEmailAddress?.emailAddress as string
      );
      if (result?.data !== null) {
        setLoggedInUser(result?.data[0]);
        console.log("current user ", result?.data[0]);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching the user
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user && getLoggedInUserByEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (loggedInUser) {
        const result = await askRoleChange(
          loggedInUser.email as string,
          loggedInUser.role as string, // current role of the user
          requestedRoleReason,
          imageUrlProof
        );

        if (result?.data !== null) {
          toast(
            <p className="text-sm font-bold text-green-500">
              Role change request submitted successfully
            </p>
          );
          setOpen(false);
          setRequestedRoleReason("");
          setImageUrlProof("");
        }
      }
    } catch (error) {
      console.log("error: ", error);
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while submitting the request
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button size={"sm"} variant={"outline"} onClick={() => setOpen(true)}>
            I&apos;m a Teacher
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-3">
              <DialogTitle>Ask for a Role Change</DialogTitle>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {/* ({loggedInUser?.roleChangeCount} request left) */}
              </span>
            </div>
            <DialogDescription>
              Inform admin of your requested role and provide credentials to
              help admin verify your claim.
            </DialogDescription>
          </DialogHeader>

          <div className="my-5">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 dark:text-gray-400">
                  Role change reason
                </label>
                <Textarea
                  rows={5}
                  placeholder="Provide reason why you want to change your role..."
                  onChange={(e) => setRequestedRoleReason(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 dark:text-gray-400">
                  Any proof to verifiy your claim (e.g. professional reference,
                  Teacher license, Proof of employment, Official invitation,
                  etc.)
                </label>
                <UploadRoleRequestProof
                  setImageUrlProof={(downloadUrl) =>
                    setImageUrlProof(downloadUrl)
                  }
                />
                <label className="text-xs text-gray-500 dark:text-gray-400">
                  Click the image banner to upload proof.
                </label>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 justify-end">
              <Button variant={"outline"} onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading || requestedRoleReason === ""}
              >
                {loading ? (
                  <LoaderCircleIcon className="w-5 h-5 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AskRoleChangeDialog;
