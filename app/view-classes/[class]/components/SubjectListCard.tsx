import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface SubjectListCardProps {
  name: string;
  slug: string;
  courseSlug: string;
}

const SubjectListCard: React.FC<SubjectListCardProps> = ({
  name,
  slug,
  courseSlug,
}) => {
  return (
    <div className="space-y-4 ">
      <Link href={`${courseSlug}/${slug}`}>
        <Button
          variant={"outline"}
          className="tex-lg text-primary/80 mt-3 font-medium w-full shadow-md p-3"
        >
          {name}
        </Button>
      </Link>
    </div>
  );
};

export default SubjectListCard;
