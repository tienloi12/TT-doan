import React from "react";
import { NavBar, Tabs, Button, Card } from "antd-mobile";
import { MoreOutline, EnvironmentOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import "../../src/styles/InformationPage.scss";

const InformationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="information-page">
      {/* Header */}
      <NavBar
        onBack={() => navigate(-1)}
        right={<MoreOutline style={{ fontSize: 24 }} />}
      >
        Information
      </NavBar>

      {/* User Info */}
      <div className="user-info">
        <h3>MR. JOIN TANH SON</h3>
        <p>VIET NAM <span className="user-id">#87365327</span></p>
      </div>

      {/* Tabs */}
      <Tabs defaultActiveKey="1" className="info-tabs">
        <Tabs.Tab title="General Info" key="1">
          <Card className="info-card">
            <div className="booking-details">
              <div className="date-info">
                <div>
                  <span className="label">Begin</span>
                  <p className="date">25 OCT 2024</p>
                </div>
                <span className="arrow">→</span>
                <div>
                  <span className="label">End</span>
                  <p className="date">30 OCT 2024</p>
                </div>
                <div className="nights">5 Nights</div>
              </div>

              <div className="rental-info">
                <EnvironmentOutline  className="home-icon" />
                <span>Executive Rental | B.101 - Family</span>
              </div>

              <div className="rate-info">
                <p><strong>Rate Type:</strong> Family Rates</p>
                <p><strong>Average Rate:</strong> 1.500.000 VND / Night</p>
                <p><strong>Adult/Children:</strong> 15 / 5</p>
              </div>

              <div className="summary">
                <h4>Summary</h4>
                <p><strong>Total Charges:</strong> 12.000.000 VND</p>
                <p><strong>Total Credits:</strong> 12.000.000 VND</p>
                <p><strong>Balance:</strong> 0 VND</p>
              </div>
            </div>
          </Card>
        </Tabs.Tab>

        <Tabs.Tab title="Guest Info" key="2">
          <Card className="info-card">
            <p>Guest details will be shown here...</p>
          </Card>
        </Tabs.Tab>

        <Tabs.Tab title="Rental Charges" key="3">
          <Card className="info-card">
            <p>Rental charges breakdown will be displayed here...</p>
          </Card>
        </Tabs.Tab>
      </Tabs>

      {/* Bottom Buttons */}
      <div className="bottom-buttons">
        <Button size="large" className="secondary-btn">Payment</Button>
        <Button size="large" className="secondary-btn">Extra Charge</Button>
        <Button size="large" className="primary-btn">Checkout</Button>
      </div>
    </div>
  );
};

export default InformationPage;
