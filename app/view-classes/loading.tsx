import Container from "@/components/common/Container";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <>
      <div className="mt-[7rem]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white ">
            <div className="bg-gray-500 w-[20rem] p-2 shadow-md rounded-md mb-5   ">
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  {/* <AccordionTrigger> */}
                  <Skeleton />
                  {/* </AccordionTrigger> */}
                  <AccordionContent>
                    <div className="">
                      <div className="space-y-5 k">
                        <Skeleton className="p-3 hover:bg-primary/5" />
                        <Skeleton className="p-3 hover:bg-primary/5" />
                        <Skeleton className="p-3 hover:bg-primary/5" />
                        <Skeleton className="p-3 hover:bg-primary/5" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
