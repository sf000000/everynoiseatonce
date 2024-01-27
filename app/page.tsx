import InfoSection from "@/app/components/info-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Experience from "@/app/components/experience";
import Projects from "@/app/components/projects";
import LatestBlogs from "./components/latest-blogs";

export default function Home() {
  return (
    <main className="flex items-center justify-between w-full flex-col p-8 min-h-screen">
      <div className="w-full max-w-3xl">
        <div>
          <InfoSection />
          <div className="border-b w-full my-8"></div>
          <Tabs defaultValue="about" className="">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="more">More</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <div className="mt-4">
                <p className="text-lg text-muted-foreground">
                  Passionate about building things for the web. I'm a
                  self-taught developer who enjoys learning new things and
                  solving problems. I'm currently working as a freelance
                  developer.
                </p>
              </div>
              <Experience />
              <Projects />
              <LatestBlogs />
            </TabsContent>
            <TabsContent value="blogs">Blogs</TabsContent>
            <TabsContent value="more">
              <div className="mt-4">
                <></>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
