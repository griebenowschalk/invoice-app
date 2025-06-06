import Container from "@/components/Container";

const Footer = () => {
  return (
    <footer className="mt-12 mb-8">
      <Container>
        <div className="flex justify-center items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Invoice App. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
