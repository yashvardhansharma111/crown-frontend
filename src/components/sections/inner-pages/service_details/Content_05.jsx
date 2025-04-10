const Content_05 = () => {
  return (
    <section id="content-section-1">
      {/* Section Spacer */}
      <div className="pb-20 xl:pb-[150px]">
        {/* Section Container */}
        <div className="global-container">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 xl:grid-cols-[minmax(0,_1.2fr)_1fr] xl:gap-28">
            {/* Content Left Block */}
            <div
              className="jos order-2 overflow-hidden rounded-md"
              data-jos_animation="fade-left"
            >
              <img
                src="assets/img/th-1/23.jpg"
                alt="content-image-2"
                width={526}
                height={450}
                className="h-auto w-full"
              />
            </div>
            {/* Content Left Block */}
            {/* Content Right Block */}
            <div className="jos order-1" data-jos_animation="fade-right">
              {/* Section Content Block */}
              {/* Section Content Block */}

              <br />
              <br />
              <div>
                <h3 style={{ fontSize: "30px" }}>
                  Invest in the Best with Crown Bankers
                </h3>
              </div>
              <br />
              <br />

              <h4>Forbes Top 500 Companies</h4>
              <p className="text-lg">
                Crown Bankers strategically invests in the Forbes Global 500,
                including industry giants like Apple, Amazon, and Microsoft.
                This approach ensures
              </p>
              <ul className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-1 xl:mt-14 xl:grid-cols-2">
                <li className="flex flex-col gap-y-4">
                  <div className="h-[50px] w-[50px]">
                    <img
                      src="assets/img/th-1/trending-up-icon.svg"
                      alt="trending-up-icon"
                      width={50}
                      height={50}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <h5>Stability and Growth</h5>
                  <p className="text-lg">
                    Leveraging established titans to mitigate risk and secure
                    steady returns
                  </p>
                </li>
                <li className="flex flex-col gap-y-4">
                  <div className="h-[50px] w-[50px]">
                    <img
                      src="assets/img/th-1/cog-icon.svg"
                      alt="cog-icon"
                      width={50}
                      height={50}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h5>Diverse Market Exposure</h5>
                  <p className="text-lg">
                    Capitalizing on diverse industry sectors for balanced
                    investment opportunities.
                  </p>
                </li>
              </ul>
              <br />
              <ul className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-1 xl:mt-14 xl:grid-cols-2">
                <li className="flex flex-col gap-y-4">
                  <div className="h-[50px] w-[50px]">
                    <img
                      src="assets/img/th-1/trending-up-icon.svg"
                      alt="trending-up-icon"
                      width={50}
                      height={50}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <h5>Innovation Integration</h5>
                  <p className="text-lg">
                    Investing in companies leading technological advancements
                    for long-term growth.
                  </p>
                </li>
                <li className="flex flex-col gap-y-4">
                  <div className="h-[50px] w-[50px]">
                    <img
                      src="assets/img/th-1/cog-icon.svg"
                      alt="cog-icon"
                      width={50}
                      height={50}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h5>Global Economic Impact</h5>
                  <p className="text-lg">
                    Participating in a significant portion of the global
                    economy's revenue generation.
                  </p>
                </li>
              </ul>
              <br />
              <br />
              <h4>Join Crown Bankers Today!</h4>
              <p className="text-lg">
                Benefit from our strategic approach to Forbes 500 investments
                and unlock your investment potential.
              </p>
            </div>
            {/* Content Right Block */}
          </div>
        </div>
        {/* Section Container */}
      </div>
      {/* Section Spacer */}
    </section>
  );
};

export default Content_05;
